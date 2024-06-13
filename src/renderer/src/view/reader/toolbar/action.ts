import { DomSource } from '@book-wise/web-highlight'
import { ref, shallowReactive } from 'vue'

export class ToolbarAction {
  static style = shallowReactive({ top: 0, left: 0 })
  static show = ref(false)

  static source: DomSource | null = null

  static open(top: number, left: number, source: DomSource) {
    this.show.value = true
    this.style.top = top
    this.style.left = left
    this.source = source
  }

  static close() {
    this.show.value = false
    this.style.top = 0
    this.style.left = 0
    this.source = null
  }
}

export class NoteBarAction {
  static show = ref(false)

  static source: DomSource | null = null

  static open(source: DomSource) {
    this.show.value = true
    this.source = source
  }

  static close() {
    this.show.value = false
    this.source = null
  }
}
