import { $, findDomIndex, getFirstLastElementChild, lastElementsToArray } from '@renderer/shared'

export function getSectionContainer(page: string | number) {
  return $(`div[data-page-number='${page}']`) as HTMLElement
}

export function getSourceTarget(page: string | number, id: string) {
  const dom = getSectionContainer(page)
  if (!dom) return null
  return dom.querySelector(`span[data-web-highlight_id='${id}']`) as HTMLElement
}

export function toPrewView(node: HTMLElement, top: number, height: number) {
  let val = top - height
  if (val < 0) val = 0

  node.scrollTo({ top: val, behavior: 'smooth' })
}

export function toNextView(node: HTMLElement, top: number, height: number, total: number) {
  let val = top + height
  if (val > total) val = total

  node.scrollTo({ top: val, behavior: 'smooth' })
}

function isFirstInView(node: HTMLElement, offsetTop: number = 0) {
  const { top, bottom } = node.getBoundingClientRect()
  return top - offsetTop <= 0 && bottom > 0
}

function getDomPosition(contianer: HTMLElement, target: HTMLElement, page: number) {
  const index = findDomIndex(contianer, target)
  if (index === -1) return null
  return { page, index, tagName: target.tagName }
}

export function getNavbarRect() {
  const navBar = $(`#book-view_nav_bar`) as HTMLElement
  if (!navBar) return null
  return navBar.getBoundingClientRect()
}

export function getSectionFirstChild(page: number) {
  const contianer = getSectionContainer(page)
  if (!contianer) return null

  const navBarRect = getNavbarRect()
  let offsetTop = 0
  if (navBarRect) {
    offsetTop = navBarRect.height
  }

  let firstElement = getFirstLastElementChild(contianer)
  if (!firstElement) return null

  const { top } = firstElement.getBoundingClientRect()
  const n = top - offsetTop
  if (n > 0) {
    // 第一个元素还没有与顶部相交，所有还得查找上一页内容
    return getSectionFirstChild(page - 1)
  } else if (n === 0) {
    // 正好找到了
    return getDomPosition(contianer, firstElement, page)
  } else {
    const doms = lastElementsToArray(contianer)
    for (const dom of doms) {
      if (isFirstInView(dom, offsetTop)) {
        console.log(dom)
        return getDomPosition(contianer, dom, page)
      }
    }
    return null
  }
}
