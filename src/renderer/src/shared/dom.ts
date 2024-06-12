export const $ = document.querySelector.bind(document)

export const $$ = document.querySelectorAll.bind(document)

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K
): HTMLElementTagNameMap[K] {
  return document.createElement(tagName)
}

/**
 * 将rem单位换算成px
 * @param value
 * @returns
 */
export function remToPx(value: number) {
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  return value * rootFontSize
}

export function isInClientRectTop(node: HTMLElement) {
  const bottom = node.getBoundingClientRect().bottom
  return bottom >= window.innerHeight / 2
}

export function getNoteOffset(node: HTMLElement, root: HTMLElement) {
  const rect = root.getBoundingClientRect()
  const { top, left, width } = node.getBoundingClientRect()
  return { top: top - rect.top, left: left - rect.left + width / 2 }

  // 获取元素相对于视窗的位置(虚拟列表使用了transform属性，它会影响元素的布局，可能会影响到兄弟元素或子元素的offsetTop值)
  // if (isRect) {
  //   const { top, left, width } = node.getBoundingClientRect()
  //   return { top, left: left + width / 2 }
  // }

  // const result = { top: 0, left: node.offsetWidth / 2 }
  // while (node && node !== root) {
  //   result.top += node.offsetTop
  //   result.left += node.offsetLeft

  //   node = node.offsetParent as HTMLElement
  // }

  // return result
}
