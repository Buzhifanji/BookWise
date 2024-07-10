import { EdgeSpeechTTS } from '@renderer/tts'
import { get, set } from '@vueuse/core'
import { Howl } from 'howler'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'

const audioBuffer: { id: string; value: ArrayBuffer }[] = []
let activeURL: string = '' // 当前播放的音频URL
let acitveText: string = '' // 当前播放的文本
let sound: Howl

export const isAudioPlaying = ref(false) // 是否播放中
export const isAudioReadying = ref(false) // 是否准备中

interface TTSOptions {
  locale: string
  input: string
  voice: string
}

export async function createTTS({ locale, input, voice }: TTSOptions) {
  const tts = new EdgeSpeechTTS({ locale })
  const connectId = uuidv4().replaceAll('-', '')

  const res = await tts.create({ input, connectId, options: { voice } })
  const arrayBuffer = await res.arrayBuffer()
  audioBuffer.push({ id: input, value: arrayBuffer })
}

const bufferToURL = (arrayBuffer: ArrayBuffer) => {
  const audioBlob = new Blob([arrayBuffer], { type: 'audio/mp3' })
  return URL.createObjectURL(audioBlob)
}

const revokeURL = () => {
  if (activeURL) {
    URL.revokeObjectURL(activeURL)
    activeURL = ''
    acitveText = ''
  }
}

export async function playAudioAction(option: TTSOptions) {
  if (option.input === acitveText && get(isAudioReadying)) return

  clearAudio()
  await createTTS(option)
  createAudio()
}

export function createAudio() {
  if (audioBuffer.length === 0) {
    return false
  } else {
    activeURL = bufferToURL(audioBuffer[0].value)
    sound = new Howl({ src: [activeURL], volume: 1, html5: true })
    sound.play()
    set(isAudioPlaying, true)
    sound.on('load', () => {
      // 释放资源
      revokeURL()
    })
    sound.on('end', () => {
      set(isAudioPlaying, false)
      // 播放下一个
      audioBuffer.shift()
      createAudio()
    })
    return true
  }
}

export function playAudio() {
  if (sound.playing()) {
    sound.pause()
  } else {
    sound.play()
  }
}

export function clearAudio() {
  sound?.unload()
  audioBuffer.length = 0
  revokeURL()
}
