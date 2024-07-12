import { TTSbus } from '@renderer/hooks'
import { set } from '@vueuse/core'
import { Howl } from 'howler'
import { ref } from 'vue'

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
