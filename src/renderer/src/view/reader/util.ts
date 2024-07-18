import { BookRender } from '@renderer/hooks'
import {
  $,
  findDomIndex,
  formatDecimal,
  getFirstLastElementChild,
  lastElementsToArray,
  remToPx,
  tocTreeToArray
} from '@renderer/shared'
import { Position } from './type'

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

export function findPositionDom(page: number, position: Position) {
  const sectionContainer = getSectionContainer(page)
  const { tagName, index } = position
  if (tagName && index !== -1) {
    return (sectionContainer?.querySelectorAll(tagName) || [])[index] as HTMLElement
  }
  return null
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
    if (n < 10) {
      return { dom: firstElement, page }
    }
    // 第一个元素还没有与顶部相交，所有还得查找上一页内容
    return getSectionFirstChild(page - 1)
  } else if (n === 0) {
    // 正好找到了
    return { dom: firstElement, page }
  } else {
    let res: HTMLElement | null = null
    const doms = lastElementsToArray(contianer)
    for (const dom of doms) {
      if (isDomIntersect(dom)) {
        return { dom: res!, page }
      } else {
        res = dom
      }
    }
    return null
  }
}

/**
 * 获取上下滑动的与顶部相交的元素第一个元素的位置信息
 * @param page
 * @returns
 */
export function getSectionFirstChildPosition(page: number) {
  const res = getSectionFirstChild(page)
  if (res) {
    const { dom, page } = res
    return getDomPosition(getSectionContainer(page), dom, page)
  }
  return null
}

export function getSectionLeftFfirstChild(contianer: HTMLElement) {
  const rect = contianer.getBoundingClientRect()
  const doms = lastElementsToArray(contianer)
  const firstElement = doms.find((item) => {
    const { left, width } = item.getBoundingClientRect()
    return left > rect.left && left < rect.left + width
  })
  if (firstElement) {
    return firstElement
  } else {
    return null
  }
}

/**
 * 获取上下滑动的可视窗口左上角的一个元素的位置信息
 * @param contianer
 * @param page
 * @returns
 */
export function getSectionLeftFfirstChildPosition(contianer: HTMLElement, page: number) {
  const dom = getSectionLeftFfirstChild(contianer)
  if (dom) {
    return getDomPosition(contianer, dom, page)
  } else {
    return null
  }
}

const cache: { progress: number; current: number }[] = []
export function getSectionSize(page: number) {
  if (cache.length) {
    return cache[page]
  } else {
    const bookRender = BookRender.getBook()
    if (!bookRender) return null

    const sections = bookRender.book.sections
    const total = sections.reduce((p: any, c: any) => p + c.size, 0)

    let reduce = 0
    for (let i = 0; i < sections.length; i++) {
      const size = sections[i].size
      reduce += size
      cache.push({
        progress: formatDecimal(reduce / total, 4),
        current: formatDecimal(size / total, 4)
      })
    }
    return cache[page]
  }
}

export function findCatalogSection() {
  const nodes = $('#scrollConatinerWise')?.children || []
  let result: HTMLElement | null = null
  // 找到当前章节
  for (const item of nodes) {
    if (isDomIntersect(item as HTMLElement)) {
      break
    } else {
      result = item as HTMLElement
    }
  }

  return result
}

function isDomIntersect(target: HTMLElement) {
  const barHeight = getNavbarRect()!.height
  return target.getBoundingClientRect().top - barHeight > remToPx(3)
}

function findIntersectPage(catalogs: any[]) {
  const container = $('#scrollConatinerWise') as HTMLElement
  let result: string = ''
  for (let i = 0; i < catalogs.length; i++) {
    const item = catalogs[i]
    const resolved = BookRender.getBookHref(item.href)
    const anchor = resolved?.anchor
    if (anchor) {
      const target = anchor(container)
      if (target) {
        // 3 为每章节的间隔距离
        if (isDomIntersect(target)) {
          return result
        } else {
          result = item.href
        }
      } else {
        if (i === 0) {
          result = item.href
        }
      }
    }
  }
  return result
}

function handleCatalog(page: number, catalogs: any[]) {
  const catalog = catalogs.find((item) => item.page === page)
  if (BookRender.isInOneCatalog) {
    const rangeCatalog = tocTreeToArray([catalog])
    return findIntersectPage(rangeCatalog)
  } else {
    const index = page - 1
    const rangeCatalog = BookRender.bookArrayToc
    const start = Math.max(0, index - 3)
    const end = Math.min(rangeCatalog.length - 1, index + 1)
    const catalog = rangeCatalog.slice(start, end)
    return findIntersectPage(catalog)
  }
}

export function findActiveCatalog() {
  if (BookRender.bookToc.length === 0) return ''

  const pageContainer = findCatalogSection()
  if (pageContainer) {
    const index = +pageContainer.getAttribute('data-index')!
    return handleCatalog(index, BookRender.bookToc)
  }

  return ''
}
