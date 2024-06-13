import { DomSource } from '@book-wise/web-highlight'
import { set } from '@vueuse/core'
import { ref, shallowReactive } from 'vue'

export class ToolbarAction {
  static style = shallowReactive({ top: 0, left: 0 })
  static show = ref(false)

  static source: DomSource | null = null

  static open(top: number, left: number, source: DomSource) {
    set(this.show, true)
    Object.assign(this.style, { top, left })
    this.source = source
  }

  static close() {
    set(this.show, false)
    Object.assign(this.style, { top: 0, left: 0 })
    this.source = null
  }
}

export class NoteBarAction {
  static show = ref(false)

  static source = ref<DomSource | null>(null)

  static open(source: DomSource) {
    set(this.show, true)
    set(this.source, source)
    console.log('open', source)
  }

  static close() {
    set(this.show, false)
    set(this.source, null)
  }
}
