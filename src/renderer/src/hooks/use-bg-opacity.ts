import { get, useToggle } from '@vueuse/core'

// 鼠标选中效果
export const useBgOpacity = () => {
  const [bgOpacity, setBgOpacity] = useToggle(1)
  const [hoverIndex, setHoverIndex] = useToggle(-1)

  function hoverAction(opacity: number, index: number) {
    setBgOpacity(opacity)
    setHoverIndex(index)
  }

  function indexBgOpacity(index: number) {
    return get(hoverIndex) === index ? get(bgOpacity) : 1
  }

  return { bgOpacity, indexBgOpacity, hoverAction, hoverIndex }
}
