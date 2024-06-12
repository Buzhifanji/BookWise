import { DomSource } from '@book-wise/web-highlight'
import { computed, ref, shallowReactive } from 'vue'

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

  static getStyle() {
    return computed(() => {
      const { top, left } = this.style

      return { top: `${top === 0 ? -1000 : top - 46}px`, left: `${left}px` }
    })
  }
}
