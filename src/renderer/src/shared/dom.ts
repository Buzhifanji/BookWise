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
