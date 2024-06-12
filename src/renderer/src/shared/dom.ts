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
  const result = { top: 0, left: 0 }

  while (node && node !== root) {
    result.top += node.offsetTop
    result.left += node.offsetLeft

    node = node.offsetParent as HTMLElement
  }

  return result
}
