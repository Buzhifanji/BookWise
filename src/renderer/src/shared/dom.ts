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

export function getNoteOffset(node: HTMLElement | Range) {
  const { top, left, width } = node.getBoundingClientRect()
  return { top, left: left + width / 2 }
}

export function lastElementsToArray(element: HTMLElement) {
  const result: HTMLElement[] = []

  function traverse(node: HTMLElement) {
    if (node.children.length > 0) {
      // 如果当前节点有子节点，递归遍历子节点
      for (let i = 0; i < node.children.length; i++) {
        traverse(node.children[i] as HTMLElement)
      }
    } else {
      // 如果当前节点是叶子节点，将其添加到结果数组
      result.push(node)
    }
  }

  traverse(element)
  return result
}

export function getFirstLastElementChild(node: HTMLElement) {
  let result = node.firstElementChild as HTMLElement
  while (result?.firstElementChild) {
    result = result.firstElementChild as HTMLElement
  }

  return result
}

export function findDomIndex(root: HTMLElement, target: HTMLElement) {
  const nodes = root.querySelectorAll(target.tagName)
  return Array.from(nodes).indexOf(target)
}
