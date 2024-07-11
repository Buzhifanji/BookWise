import { TTSbus } from '@renderer/hooks'
import { edgeTSS } from '@renderer/tts'
import { set } from '@vueuse/core'
import { Howl, Howler } from 'howler'
import { split } from 'sentence-splitter'
import SparkMD5 from 'spark-md5'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'

let activeURL: string = '' // 当前播放的音频URL
let sound: Howl
const zeroPoint = 10

export const hasAudio = ref(false) // 是否有音频
export const isAudioPlaying = ref(false) // 是否播放中
export const isAudioReadying = ref(false) // 是否准备中

const sentenceMap = new Map<string, string>() // 文本hash映射
const sentenceQueue: { hax: string; connectId: string }[] = [] // 文本hash队列
const audioBufferMap = new Map<string, ArrayBuffer>() // 音频缓存

interface TTSOptions {
  input: string
  voice: string
}

interface SentenceData {
  hax: string
  connectId: string
  sectence: string
}

function resetData() {
  revokeURL()
  sentenceMap.clear()
  sentenceQueue.length = 0
  audioBufferMap.clear()
  Howler.unload()
}

function spliteSentence(val: string) {
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
    const connectId = uuidv4().replaceAll('-', '')
    const data = { hax: hex, connectId }
    sentenceQueue.push(data)
    result.push({ ...data, sectence: item })
  }
  return result
}

function handleInput(val: string) {
  const sentencs = spliteSentence(val)
  return sentenceToHash(sentencs)
}

function emitNext() {
  if (sentenceQueue.length <= zeroPoint) {
    TTSbus.emit('next')
  }
}

function audioAction(isEmitNext = false) {
  if (sentenceQueue.length === 0) {
    resetData()
    return
  }

  const buffet = audioBufferMap.get(sentenceQueue[0].connectId)
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
      sentenceQueue.shift()

      // 通知上层，继续传入文本转语言
      isEmitNext && emitNext()

      audioAction(isEmitNext)
    })
  } else {
    // 数据丢失了
    console.log('数据丢失了')
    // sentenceQueue.shift()
    // audioAction(isEmitNext)
  }
}

export async function createTTS({ input, voice }: TTSOptions, connectId: string) {
  try {
    const res = await edgeTSS({ payload: { input, connectId, options: { voice } } })
    audioBufferMap.set(connectId, res)
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

async function createTTSList(option: TTSOptions, val: SentenceData[]) {
  for (let i = 0; i < val.length; i++) {
    await createTTS({ ...option, input: val[i].sectence }, val[i].connectId)
  }
}

async function handlePlayAudio(option: TTSOptions, isEmitNext: boolean) {
  const sentencs = handleInput(option.input)
  if (sentencs.length) {
    set(isAudioReadying, true)
    await createTTS({ ...option, input: sentencs[0].sectence }, sentencs[0].connectId)
    // 第一个需要播放
    audioAction(isEmitNext)
    set(isAudioReadying, false)
    await createTTSList(option, sentencs.slice(1))
  }
}

/**
 * 只播放一次（用于高亮内容）
 * @param option
 */
export async function playAudioOnce(option: TTSOptions) {
  try {
    resetData()
    await handlePlayAudio(option, false)
  } catch (err) {
    console.error('playAudioOnce error', err)
  }
}

/**
 * 连续播放（用于朗读书籍）
 * @param option
 * @param isFirst
 */
export async function playAudioRepeat(option: TTSOptions, isFirst = false) {
  try {
    if (isFirst) {
      resetData()
      await handlePlayAudio(option, true)
    } else {
      const sentencs = handleInput(option.input)
      await createTTSList(option, sentencs)
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
