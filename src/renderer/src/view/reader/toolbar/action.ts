import { DomSource } from '@book-wise/web-highlight'
import { set } from '@vueuse/core'
import { ref, shallowReactive } from 'vue'

export class ToolbarAction {
  static style = shallowReactive({ top: 0, left: 0 })
  static show = ref(false)
  static isEdite = ref(true)
  static source: DomSource[] = []

  static open(top: number, left: number, source: DomSource[], isEdite: boolean) {
    set(this.show, true)
    set(this.isEdite, isEdite)
    Object.assign(this.style, { top, left })
    this.source = source
  }

  static close() {
    set(this.show, false)
    Object.assign(this.style, { top: 0, left: 0 })
    this.source = []
  }
}

export class NoteBarAction {
  static show = ref(false)
  static isPainted = true
  static source = ref<DomSource[]>([])

  static open(source: DomSource[], isPainted: boolean) {
    set(this.show, true)
    set(this.source, source)
    this.isPainted = isPainted
  }

  static close() {
    set(this.show, false)
    set(this.source, [])
  }
}
