import { DomSource } from './interface'
import { getDomMeta } from './meta'
import { getOption } from './option'
import { UNKNOWN_INDEX } from './util/const'
import { createUUID } from './util/uuid'

const findPageIndexNode = (node: Node) => {
  const { pageAttribateName, root } = getOption()
  let result: HTMLElement | null = null
  if (pageAttribateName === '') return result

  while (node) {
    if (node instanceof HTMLElement && node.hasAttribute(pageAttribateName)) {
      result = node
      break
    }

    if (node === root) {
      break
    }

    node = node.parentNode as Node
  }

  return result
}

const findPageIndex = (node: HTMLElement) => {
  const { pageAttribateName } = getOption()
  return node.getAttribute(pageAttribateName) || `${UNKNOWN_INDEX}`
}

const getfirstElementChild = (node: HTMLElement) => {
  let result = node.firstElementChild as HTMLElement
  while (result?.firstElementChild) {
    result = result.firstElementChild as HTMLElement
  }

  return result
}

const getRangeDoms = (startDom: HTMLElement, endDom: HTMLElement) => {
  const result: HTMLElement[] = []
  let start = startDom
  while (start !== endDom) {
    result.push(start)
    start = start.nextSibling as HTMLElement
  }
  result.push(start)
  return result
}

const getlastTextNode = (node: HTMLElement) => {
  let result = node.lastElementChild as HTMLElement
  while (result?.lastElementChild) {
    result = result.lastElementChild as HTMLElement
  }

  return result
}

const setRange = ({
  startDom,
  endDom,
  startOffset,
  endOffset
}: {
  startDom: Node
  endDom: Node
  startOffset?: number
  endOffset?: number
}) => {
  const range = document.createRange()
  if (startOffset === undefined) {
    range.setStartBefore(startDom)
  } else {
    range.setStart(startDom, startOffset)
  }

  if (endOffset === undefined) {
    range.setEndAfter(endDom)
  } else {
    range.setEnd(endDom, endOffset)
  }

  return range
}

const oneRangeToSource = (range: Range, id: string, page: string) => {
  const { className, tagName } = getOption()
  const { startContainer, startOffset, endContainer, endOffset } = range
  const startDomMeta = getDomMeta(startContainer as HTMLElement, startOffset, page)
  const endDomMeta = getDomMeta(endContainer as HTMLElement, endOffset, page)
  const text = range.toString()
  // console.log('startContainer', startContainer)
  // console.log('endContainer', endContainer)
  // console.log('startDomMeta: ', startDomMeta)
  // console.log('endDomMeta: ', endDomMeta)
  return { startDomMeta, endDomMeta, className, tagName, text, id, page }
}

const handleSectionSource = (startSection: HTMLElement, endSection: HTMLElement, range: Range) => {
  const result: DomSource[] = []
  if (startSection.parentNode !== endSection.parentNode) return { id: '', source: [] }

  const id = createUUID()
  if (startSection === endSection) {
    console.log(range)
    const page = findPageIndex(startSection)
    result.push(oneRangeToSource(range, id, page))
  } else {
    const doms = getRangeDoms(startSection, endSection)
    const { startContainer, endContainer, startOffset, endOffset } = range

    for (let i = 0; i < doms.length; i++) {
      const dom = doms[i]
      const page = findPageIndex(dom)
      let range: Range
      if (i === 0) {
        const endDom = getlastTextNode(dom)
        range = setRange({
          startDom: startContainer,
          startOffset,
          endDom: endDom.lastChild!,
          endOffset: endDom.textContent?.length || 0
        })
      } else if (i === doms.length - 1) {
        const startDom = getfirstElementChild(dom)
        // console.log(startDom.lastChild)
        // console.log(startDom)
        range = setRange({
          startDom: startDom.lastChild!,
          startOffset: 0,
          endDom: endContainer,
          endOffset
        })
      } else {
        const startDom = getfirstElementChild(dom)
        const endDom = getlastTextNode(dom)
        range = setRange({ startDom, endDom })
      }
      result.push(oneRangeToSource(range, id, page))
    }
  }
  console.log(result)
  return { id, source: result }
}

export function rangeToSource(range: Range) {
  const { startContainer, endContainer } = range
  // 查找章节容器dom
  const startSection = findPageIndexNode(startContainer as HTMLElement)
  const endSection = findPageIndexNode(endContainer as HTMLElement)

  if (startSection && endSection) {
    return handleSectionSource(startSection, endSection, range)
  } else {
    const id = createUUID()
    const source = oneRangeToSource(range, id, `${UNKNOWN_INDEX}`)
    return { id, source: [source] }
  }
}
