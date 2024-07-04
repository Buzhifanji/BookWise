import { get, set } from '@vueuse/core'
import scrollIntoView from 'scroll-into-view-if-needed'
import { Ref, ref } from 'vue'

export const useTabList = <T>(list: Ref<T[]>) => {
  const activePlaceholder = ref(-1)
  const listContianer = ref<HTMLUListElement | null>(null)

  function onDown() {
    const index = get(activePlaceholder)
    const len = get(list).length
    if (index < len - 1) {
      set(activePlaceholder, index + 1)
      activeToView()
    }
  }

  function onUp() {
    const index = get(activePlaceholder)
    if (index <= 0) {
      set(activePlaceholder, 0)
    } else {
      set(activePlaceholder, index - 1)
    }
    activeToView()
  }

  function onTab(cb: (value: number) => void) {
    const index = get(activePlaceholder)
    if (index !== -1) {
      cb(index)
    }
  }

  function activeToView() {
    const node = get(listContianer)
    if (!node) return
    const { scrollHeight, clientHeight } = node
    if (scrollHeight <= clientHeight) return // 无滚动条

    const target = node.children[get(activePlaceholder)]?.firstElementChild
    if (!target) return
    scrollIntoView(target, { behavior: 'smooth', scrollMode: 'if-needed' })
  }

  return { onDown, onUp, onTab, activePlaceholder, listContianer }
}
