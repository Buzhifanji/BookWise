import { TTSbus } from '@renderer/hooks'
import { get, set } from '@vueuse/core'
import { Howl } from 'howler'
import { computed, ref, watchEffect } from 'vue'

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

export class Sound {
  private bufferToURL = new BufferToURL()
  private sound: Howl | null = null
  public isPlaying = ref(false)

  play = (buffet: ArrayBuffer) => {
    const url = this.bufferToURL.toURL(buffet)
    this.sound = new Howl({ src: [url], html5: true })
    this.sound.play()
    set(this.isPlaying, true)
    this.sound.on('load', () => this.bufferToURL.revoke()) // 释放内存

    this.sound.on('end', () => {
      set(this.isPlaying, false)
      this.clear()
      TTSbus.emit('next')
    })
  }

  toggle = () => {
    if (this.sound) {
      if (this.sound.playing()) {
        this.sound.pause()
        set(this.isPlaying, false)
      } else {
        this.sound.play()
        set(this.isPlaying, true)
      }
    }
  }

  clear = () => {
    this.bufferToURL.revoke()
    this.sound?.unload()
  }
}

export const useSoundVolume = () => {
  const volume = ref<number>(100) // 音量
  const isMute = computed(() => (+get(volume) === 0 ? true : false)) // 是否静音

  watchEffect(() => {
    Howler.volume(+(+volume.value / 100).toFixed(1))
  })

  return { volume, isMute }
}
