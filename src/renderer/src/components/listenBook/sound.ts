import { TTSbus } from '@renderer/hooks'
import { isString } from '@renderer/shared'
import { get, set } from '@vueuse/core'
import { Howl } from 'howler'
import { computed, Ref, ref, watchEffect } from 'vue'

class BufferToURL {
  public url = ''

  toURL(arrayBuffer: ArrayBuffer) {
    const audioBlob = new Blob([arrayBuffer], { type: 'audio/mp3' })
    this.url = URL.createObjectURL(audioBlob)
    return this.url
  }

  revoke() {
    if (this.url) {
      URL.revokeObjectURL(this.url)
      this.url = ''
    }
  }
}

class WebSpeech {
  private webSpeech: SpeechSynthesisUtterance | null = null

  constructor(private isPlaying: Ref<boolean>) {}

  play = (text: string) => {
    this.webSpeech = new SpeechSynthesisUtterance()
    this.webSpeech.text = text
    window.speechSynthesis.speak(this.webSpeech)
    set(this.isPlaying, true)
    this.webSpeech.onend = () => {
      set(this.isPlaying, false)
      this.clear()
      TTSbus.emit('next')
    }
  }

  toggle = () => {
    if (this.webSpeech) {
      const { speaking, paused } = window.speechSynthesis
      if (speaking) {
        if (paused) {
          window.speechSynthesis.resume()
          set(this.isPlaying, true)
        } else {
          window.speechSynthesis.pause()
          set(this.isPlaying, false)
        }
      }
    }
  }

  clear = () => {
    window.speechSynthesis.cancel()
    this.webSpeech = null
  }

  volume = (val: number) => {
    if (this.webSpeech) {
      window.speechSynthesis.pause()
      this.webSpeech.volume = val
      window.speechSynthesis.resume()
    }
  }
}

class EdgeSpeech {
  private edgeSpeech: Howl | null = null
  private bufferToURL = new BufferToURL()

  constructor(private isPlaying: Ref<boolean>) {}

  play = (buffet: ArrayBuffer) => {
    const url = this.bufferToURL.toURL(buffet)
    this.edgeSpeech = new Howl({ src: [url], html5: true })
    this.edgeSpeech.play()
    set(this.isPlaying, true)
    this.edgeSpeech.on('load', () => this.bufferToURL.revoke()) // 释放内存

    this.edgeSpeech.on('end', () => {
      set(this.isPlaying, false)
      this.clear()
      TTSbus.emit('next')
    })
  }

  toggle = () => {
    if (this.edgeSpeech) {
      if (this.edgeSpeech.playing()) {
        this.edgeSpeech.pause()
        set(this.isPlaying, false)
      } else {
        this.edgeSpeech.play()
        set(this.isPlaying, true)
      }
    }
  }

  clear = () => {
    this.bufferToURL.revoke()
    this.edgeSpeech?.unload()
  }

  volume = (val: number) => {
    if (this.edgeSpeech) {
      Howler.volume(val)
    }
  }
}

export class Sound {
  public isPlaying = ref(false)
  public volume = ref<number>(100)
  public isMute = computed(() => (+get(this.volume) === 0 ? true : false)) // 是否静音
  private webSpeech = new WebSpeech(this.isPlaying)
  private edgeSpeech = new EdgeSpeech(this.isPlaying)

  constructor() {
    watchEffect(() => {
      const val = +(+get(this.volume) / 100).toFixed(1)
      this.webSpeech.volume(val)
      this.edgeSpeech.volume(val)
    })
  }

  play = (val: ArrayBuffer | string) => {
    if (isString(val)) {
      this.webSpeech.play(val)
    } else {
      this.edgeSpeech.play(val)
    }
  }

  toggle = () => {
    this.webSpeech.toggle()
    this.edgeSpeech.toggle()
  }

  clear = () => {
    this.webSpeech.clear()
    this.edgeSpeech.clear()
  }
}
