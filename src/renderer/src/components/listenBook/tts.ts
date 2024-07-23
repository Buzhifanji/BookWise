import { TTSbus } from '@renderer/hooks'
import { edgeTSS } from '@renderer/tts'
import { get, set } from '@vueuse/core'
import { Howl, Howler } from 'howler'
import { split } from 'sentence-splitter'
import SparkMD5 from 'spark-md5'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'

let activeURL: string = '' // 当前播放的音频URL
let sound: Howl

export const hasAudio = ref(false) // 是否有音频
export const isAudioPlaying = ref(false) // 是否播放中
export const isAudioReadying = ref(false) // 是否准备中

interface TTSOptions {
  input: string
  voice: string
}

interface SentenceData {
  hax: string
  connectId: string
  sectence?: string
}

class SentenceQueue {
  private queue: SentenceData[] = [] // 文本队列
  private audioStore: Map<string, ArrayBuffer> = new Map() // 音频缓存
  private sentenceStore: Map<string, SentenceData> = new Map() // 文本hash映射
  public active = ref(0)
  private zeroPoint = 10 // 临界点是否达到

  addQueue(val: SentenceData) {
    const res = this.sentenceStore.get(val.hax) || val
    this.queue.push(res)
    this.sentenceStore.set(val.hax, res)
  }

  addAudio(connectId: string, val: ArrayBuffer) {
    this.audioStore.set(connectId, val)
  }

  getAudio() {
    const data = this.queue[get(this.active)]
    if (data) {
      return this.audioStore.get(data.connectId)
    }
    return undefined
  }

  getActive() {
    return get(this.active)
  }

  setActive(num: number) {
    set(this.active, num)
  }

  has() {
    return this.queue.length > 0
  }

  next() {
    const n = get(this.active)
    if (n < this.queue.length - 1) {
      this.setActive(n + 1)
      return true
    } else {
      return false
    }
  }

  prev() {
    const n = get(this.active)
    if (n > 0) {
      this.setActive(n - 1)
      return true
    } else {
      return false
    }
  }

  /**
   * 是否达到临界点
   * @returns
   */
  isZeroPoint() {
    return this.queue.length <= this.zeroPoint
  }

  clear() {
    this.queue.length = 0
    this.audioStore.clear()
    this.sentenceStore.clear()
    this.setActive(0)
  }
}

const sentenceQueue = new SentenceQueue()

function resetData() {
  revokeURL()
  sentenceQueue.clear()
  Howler.unload()
}

export function spliteSentence(val: string) {
  try {
    return split(val)
      .filter((item) => item.type === 'Sentence')
      .map((item) => item.raw)
  } catch {
    return [val]
  }
}

function sentenceToHash(val: string[]) {
  const result: SentenceData[] = []
  for (const item of val) {
    const hex = SparkMD5.hash(item)
    const connectId = uuidv4().replaceAll('-', '') as string
    const data = { hax: hex, connectId }
    sentenceQueue.addQueue(data)
    result.push({ ...data, sectence: item })
  }
  return result
}

function handleInput(val: string) {
  const sentencs = spliteSentence(val)
  return sentenceToHash(sentencs)
}

function emitNext() {
  if (sentenceQueue.isZeroPoint()) {
    TTSbus.emit('next')
  }
}

function audioAction(isEmitNext = false) {
  if (!sentenceQueue.has()) {
    resetData()
    return
  }

  const buffet = sentenceQueue.getAudio()
  if (buffet) {
    activeURL = bufferToURL(buffet)
    sound = new Howl({ src: [activeURL], html5: true })
    sound.play()
    set(isAudioPlaying, true)
    set(hasAudio, true)

    sound.on('load', () => {
      // 释放资源
      revokeURL()
    })

    sound.on('end', () => {
      set(isAudioPlaying, false)
      set(hasAudio, false)
      // 播放下一个
      const next = sentenceQueue.next()
      if (next) {
        // 通知上层，继续传入文本转语言
        isEmitNext && emitNext()

        audioAction(isEmitNext)
      }
    })
  } else {
    // 数据丢失了
    console.log('数据丢失了')
  }
}

export async function createTTS({ input, voice }: TTSOptions, connectId: string) {
  try {
    const res = await edgeTSS({ payload: { input, connectId, options: { voice } } })
    sentenceQueue.addAudio(connectId, res)
  } catch (err) {
    console.error('createTTS error', err)
  }
}

const bufferToURL = (arrayBuffer: ArrayBuffer) => {
  const audioBlob = new Blob([arrayBuffer], { type: 'audio/mp3' })
  return URL.createObjectURL(audioBlob)
}

const revokeURL = () => {
  if (activeURL) {
    URL.revokeObjectURL(activeURL)
    activeURL = ''
  }
}

async function createTTSList(voice: string, val: SentenceData[]) {
  for (let i = 0; i < val.length; i++) {
    await createTTS({ voice, input: val[i].sectence! }, val[i].connectId)
  }
}

/**
 * 只播放一次（用于高亮内容）
 * @param option
 */
export async function playAudioOnce(option: TTSOptions) {
  try {
    resetData()
    const sentencs = handleInput(option.input)
    if (sentencs.length) {
      set(isAudioReadying, true)
      await createTTS({ ...option, input: sentencs[0].sectence! }, sentencs[0].connectId)
      // 第一个需要播放
      audioAction(false)
      set(isAudioReadying, false)
      await createTTSList(option.voice, sentencs.slice(1))
    }
  } catch (err) {
    console.error('playAudioOnce error', err)
  }
}

/**
 * 连续播放（用于朗读书籍）
 * @param option
 * @param isFirst
 */
export async function playAudioRepeat(voice: string, sentencs: string[], isFirst = false) {
  try {
    if (sentencs.length === 0) return
    if (isFirst) resetData()

    const data = sentenceToHash(sentencs)
    if (isFirst) {
      set(isAudioReadying, true)
      await createTTS({ voice, input: data[0].sectence! }, data[0].connectId)
      audioAction(true)
      set(isAudioReadying, false)
      await createTTSList(voice, data.slice(1))
    } else {
      await createTTSList(voice, data)
    }
  } catch (err) {
    console.error('playAudioOnce error', err)
  }
}

export function changeAudio() {
  if (sound.playing()) {
    set(isAudioPlaying, false)
    sound.pause()
  } else {
    set(isAudioPlaying, true)
    sound.play()
  }
}

export const clearAudio = resetData
