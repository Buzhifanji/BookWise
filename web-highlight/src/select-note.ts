import { INTERNAL_ERROR_EVENT, errorEventEimtter } from './event'
import { DomSource } from './interface'
import { DomMeta } from './meta'
import { getOption } from './option'
import { selctorAll } from './util/dom'
import { ERROR } from './util/err'
import { isNull, isTextNode } from './util/is'

interface SelectTextNode {
  node: Node
  offset: number
  parent: HTMLElement
  parentOffset: number
}

export interface SelectNode {
  node: Node
}

const getTextLen = (node: Node) => node!.textContent!.length

const getDomByTagNameIndex = (tagName: string, index: number) => {
  const root = getOption().root
  const doms = selctorAll(tagName, root)
  if (index < 0 || index > doms.length) {
    errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
      type: ERROR.HIGHLIGHT_SOURCE_DOM_META_INDEX,
      error: `cann't find element by 【 tagName: ${tagName} 】 and  【 index: ${index} 】`
    })
    return null
  }
  return doms[index]
}

const getTextNodeByOffset = (parent: HTMLElement, offset: number, isStart = true) => {
  const nodeStack: Node[] = [parent]

  let currentNode: Node | undefined = undefined
  let curOffset = 0
  let startOffset = 0

  while ((currentNode = nodeStack.pop())) {
    const children = currentNode.childNodes
    for (let i = children.length - 1; i >= 0; i--) {
      nodeStack.push(children[i])
    }

    if (isTextNode(currentNode)) {
      startOffset = offset - curOffset
      curOffset += getTextLen(currentNode)

      // fixed: 覆盖上一个 warp 节点的时候，会多出一个空的 wrap
      const handler = isStart ? curOffset > offset : curOffset >= offset
      if (handler) {
        break
      }
    }
  }

  if (!currentNode) {
    currentNode = parent
  }

  return { node: currentNode, offset: startOffset }
}

const getDomNode = ({ tagName, index, offset }: DomMeta, isStart = true) => {
  const dom = getDomByTagNameIndex(tagName, index)
  if (isNull(dom)) {
    return dom
  }

  const node = getTextNodeByOffset(dom, offset, isStart)

  return { parent: dom, parentOffset: offset, ...node }
}

const sameTextNode = (text: Text, startOffset: number, endOffset: number): SelectNode[] => {
  text.splitText(startOffset)

  const node = text.nextSibling as Text

  node.splitText(endOffset - startOffset)

  return [{ node }]
}

const findFirstSameParentNode = (start: HTMLElement, end: HTMLElement) => {
  if (start.contains(end)) return start

  if (end.contains(start)) return end

  let result = start.parentElement
  while (result) {
    if (result.contains(end)) {
      break
    }
    result = result.parentElement
  }

  return
}

const spaceTextNode = (node: HTMLElement, start: SelectTextNode, end: SelectTextNode) => {
  const stack: HTMLElement | Node[] = [node]
  const result: SelectNode[] = []

  let currentNode: HTMLElement | Node | undefined = undefined
  let withinSelectedRange = false

  while ((currentNode = stack.pop())) {
    // todo exceptSelectors

    const children = currentNode.childNodes

    for (let i = children.length - 1; i >= 0; i--) {
      stack.push(children[i] as Node)
    }

    if (currentNode === start.node) {
      // 收集开始文本节点
      if (isTextNode(currentNode)) {
        ;(currentNode as Text).splitText(start.offset)

        const node = currentNode.nextSibling as Text

        result.push({ node })
      }

      withinSelectedRange = true
    } else if (currentNode === end.node) {
      // 收集结束文本节点
      if (isTextNode(currentNode)) {
        const node = currentNode as Text

        node.splitText(end.offset)
        result.push({ node })
      }

      break
    } else if (withinSelectedRange && isTextNode(currentNode)) {
      // 收集中间文本节点
      result.push({ node: currentNode as Text })
    }
  }

  return result
}

const getAllSelectDom = (start: SelectTextNode, end: SelectTextNode) => {
  const { node: startNode, offset: startOffset } = start
  const { node: endNode, offset: endOffset } = end

  if (!startNode) {
    errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
      type: ERROR.HIGHLIGHT_SOURCE_SELECTION_NOTE,
      error: `Can't get start note in getAllSelectDom method action.The startNode is: ${startNode}`,
      startNode: start
    })
    return []
  }

  if (!endNode) {
    errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
      type: ERROR.HIGHLIGHT_SOURCE_SELECTION_NOTE,
      error: `Can't get start note in getAllSelectDom method action.The startNode is: ${endNode}`,
      endNode: end
    })
    return []
  }

  if (startNode === endNode && isTextNode(startNode)) {
    return sameTextNode(startNode as Text, startOffset, endOffset)
  }

  const parentNode = findFirstSameParentNode(start.parent, end.parent)!

  return spaceTextNode(parentNode, start, end)
}

export function getSelectNodes(source: DomSource) {
  const { startDomMeta, endDomMeta } = source
  const startNode = getDomNode(startDomMeta)
  if (!startNode) {
    return startNode
  }

  const endNode = getDomNode(endDomMeta, false)
  if (!endNode) {
    return endNode
  }

  return getAllSelectDom(startNode, endNode)
}
