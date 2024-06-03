import { shallowReactive } from 'vue'

/**
 * 右键
 * @returns
 */
export const useRightClick = () => {
  const rightInfo = shallowReactive({
    show: false,
    top: '0px',
    left: '0px'
  })

  function rightEvent({ target, clientY, clientX }: MouseEvent, height: number = 180) {
    const mid = document.body.clientHeight / 2

    const { y } = (target as HTMLElement).getBoundingClientRect()

    const temp = y > mid ? height : 0

    rightInfo.show = true
    rightInfo.top = clientY - temp + 'px'
    rightInfo.left = clientX + 'px'
  }

  function closeRight() {
    rightInfo.show = false
  }

  return { rightEvent, closeRight, rightInfo }
}
