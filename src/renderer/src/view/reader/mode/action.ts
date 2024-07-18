import { get, set } from '@vueuse/core'
import scrollIntoView from 'scroll-into-view-if-needed'
import { nextTick, Ref } from 'vue'

let isFinishedRender = false // 是否完成渲染

export function setFinishedRender(value: boolean) {
  isFinishedRender = value
}

export class jumpAction<T> {
  private value: T | undefined = undefined
  private cacheDomToview: (() => void) | undefined = undefined // 缓存dom跳转到视图的函数

  set(value: T | undefined) {
    this.value = value
  }

  get() {
    return this.value
  }

  has() {
    return this.value !== undefined
  }

  toView(
    jumpPage: Ref<number>,
    target: HTMLElement | null,
    block: ScrollLogicalPosition = 'start'
  ) {
    const val = this.value
    if (get(jumpPage) < 0) return
    if (!val) return
    if (!target) return

    this.domToView(target, block)
    if (isFinishedRender) {
      this.set(undefined)
      set(jumpPage, -1)
    }
  }

  async runCache() {
    if (this.cacheDomToview) {
      await nextTick()
      this.cacheDomToview()
    }
  }

  domToView(dom: HTMLElement, block: ScrollLogicalPosition = 'start') {
    if (isFinishedRender) {
      scrollIntoView(dom, { behavior: 'smooth', scrollMode: 'always', block })
      this.cacheDomToview = undefined
    } else {
      this.cacheDomToview = () => this.domToView(dom, block)
    }
  }
}
