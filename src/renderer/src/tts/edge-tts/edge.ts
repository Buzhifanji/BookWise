import { concatArrayBuffers } from '@renderer/shared'
import { genSendContent, genSSML, getHeadersAndData, SsmlOptions } from './ssml'

export interface EdgeSpeechPayload {
  connectId: string

  /**
   * @title 语音合成的文本
   */
  input: string
  /**
   * @title SSML 语音合成的配置
   */
  options: Pick<SsmlOptions, 'voice'>
}

export interface CreateEdgeSpeechCompletionOptions {
  payload: EdgeSpeechPayload
}

const EDGE_SPEECH_URL =
  'wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1'
const EDGE_API_TOKEN = '6A5AA1D4EAFF4E9FB37E23D68491D6F4'

let ws: WebSocket | null = null
let timer: NodeJS.Timeout | null = null

const executorMap: Map<string, { resolve: Function; reject: Function }> = new Map()
const bufferMap: Map<string, ArrayBuffer> = new Map()

const genHeader = (connectId: string) => {
  const date = new Date().toString()
  const configHeader = {
    'Content-Type': 'application/json; charset=utf-8',
    Path: 'speech.config',
    'X-Timestamp': date
  }
  const contentHeader = {
    'Content-Type': 'application/ssml+xml',
    Path: 'ssml',
    'X-RequestId': connectId,
    'X-Timestamp': date
  }
  return {
    configHeader,
    contentHeader
  }
}

const configContent = JSON.stringify({
  context: {
    synthesis: {
      audio: {
        metadataoptions: { sentenceBoundaryEnabled: false, wordBoundaryEnabled: true },
        outputFormat: 'audio-24khz-48kbitrate-mono-mp3'
      }
    }
  }
})

const sendMessage = (payload: EdgeSpeechPayload) => {
  const { input, options, connectId } = payload
  const { configHeader, contentHeader } = genHeader(connectId)
  const config = genSendContent(configHeader, configContent)
  const content = genSendContent(contentHeader, genSSML(input, options))
  ws?.send(config)
  ws?.send(content)
}

const clearTimer = () => {
  if (timer) clearTimeout(timer)
  timer = null
}

function createWebSocket(connectId: string): Promise<WebSocket> {
  const url = `${EDGE_SPEECH_URL}?TrustedClientToken=${EDGE_API_TOKEN}&ConnectionId=${connectId}`
  const socket = new WebSocket(url)
  return new Promise((resolve, reject) => {
    socket.binaryType = 'arraybuffer'
    const onOpen = () => resolve(socket)

    const onMessage = async (event: MessageEvent<any>) => {
      if (typeof event.data === 'string') {
        const { headers } = getHeadersAndData(event.data)
        const id = headers['X-RequestId']
        switch (headers['Path']) {
          case 'turn.start': {
            bufferMap.set(id, new ArrayBuffer(0))
            console.info(`开始传输：${id}`)
            break
          }
          case 'turn.end': {
            const executor = executorMap.get(id)
            if (executor) {
              executorMap.delete(id)
              const res = bufferMap.get(id)
              bufferMap.delete(id)
              executor.resolve(res)
              console.info(`传输完成：${id}`)
            } else {
              console.info(`请求已被丢弃：${id}`)
            }
            break
          }
        }
      } else if (event.data instanceof ArrayBuffer) {
        const dataview = new DataView(event.data)
        const headerLength = dataview.getInt16(0)
        if (event.data.byteLength > headerLength + 2) {
          const val = new TextDecoder('utf-8').decode(event.data)
          const start = val.indexOf('X-RequestId:')
          const end = val.indexOf('Content-Type')
          const id = val.substring(start + 'X-RequestId:'.length, end).trim()
          const buffer = bufferMap.get(id)
          if (buffer) {
            const newBody = event.data.slice(2 + headerLength)
            const newAudioData = concatArrayBuffers(buffer, newBody)
            bufferMap.set(id, newAudioData)
          } else {
            console.info(`请求已被丢弃：${id}`)
          }
        }
      }
    }
    const onError = () => {
      reject(new Error('WebSocket error occurred.'))
      ws?.close()
    }
    const onClose = (val: any) => {
      ws = null
      clearTimer()
      for (let [_, value] of executorMap) {
        value.reject(`连接已关闭: ${val}`)
      }
      executorMap.clear()
      bufferMap.clear()
      console.info(`连接已关闭: ${val}`)
    }
    socket.addEventListener('open', onOpen)
    socket.addEventListener('message', onMessage)
    socket.addEventListener('error', onError)
    socket.addEventListener('close', onClose)
  })
}

async function convert({ payload }: CreateEdgeSpeechCompletionOptions) {
  const connectId = payload.connectId
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    console.info('准备连接服务器……')
    ws = await createWebSocket(connectId)
  }

  const res = new Promise((resolve, reject) => {
    // 等待服务器返回后这个方法才会返回结果
    executorMap.set(connectId, {
      resolve,
      reject
    })

    sendMessage(payload)
  })

  clearTimer()

  // 设置定时器，超过10秒没有收到请求，主动断开连接
  timer = setTimeout(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.info(`连接超时，主动断开连接：${connectId}`)
      ws.close(1000)
      timer = null
    }
  }, 15 * 1000)

  // 如果超过 18 秒没有返回结果，则清除请求并返回超时
  return await Promise.race([res, timeOut(connectId)])
}

async function reconnect(fn: Function, times: number, errorFn: Function, failedMessage?: string) {
  const reason: { message: string; errors: any[] } = {
    message: failedMessage ?? '多次尝试后失败',
    errors: []
  }

  let index = 0

  for (let i = 0; i < times; i++) {
    index = i
    try {
      return await fn()
    } catch (error) {
      if (errorFn) {
        errorFn(index, error)
      }
      reason.errors.push(error)
    }
  }
  throw reason
}

function timeOut(connectId: string) {
  return new Promise((_, reject) =>
    setTimeout(() => {
      executorMap.delete(connectId)
      bufferMap.delete(connectId)
      reject(new Error('请求超时'))
    }, 18 * 1000)
  )
}

export async function edgeTSS(value: CreateEdgeSpeechCompletionOptions) {
  return await reconnect(
    async () => await convert(value),
    6,
    (index: number, error: any) => console.log(`第${index}次链接服务器失败：${error}`),
    '服务器多次尝试后转换失败'
  )
}
