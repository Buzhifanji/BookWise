import { Mode } from './mode'
import { getOption } from './option'
import { ROOT_INDEX } from './util/const'
import { queryDomIndex } from './util/dom'
import { isHighlightWrapNode, isTextNode } from './util/is'

const getOrinalParent = (node: Node): HTMLElement => {
  if (node instanceof HTMLElement && !isHighlightWrapNode(node)) {
    return node
  }

  let parent = node.parentNode as HTMLElement

  while (isHighlightWrapNode(parent)) {
    parent = parent.parentNode as HTMLElement
  }

  return parent
}

const getSingleOrinalParent = (node: Node): HTMLElement => {
  while (!(node instanceof HTMLElement)) {
    node = node.parentNode as Node
  }
  return node
}

const getTextLen = (node: Node) => node!.textContent!.length

const getTextPreOffset = (orinalParent: Node, textNode: Node): number => {
  const nodeStack: Node[] = [orinalParent]

  let currentNode: Node | undefined = undefined
  let offset = 0

  while ((currentNode = nodeStack.pop())) {
    const children = currentNode.childNodes
    for (let i = children.length - 1; i >= 0; i--) {
      nodeStack.push(children[i])
    }

    if (isTextNode(currentNode)) {
      if (currentNode === textNode) {
        break
      } else {
        offset += getTextLen(currentNode)
      }
    }
  }
  return offset
}

export interface DomMeta {
  tagName: string // 标签
  index: number // 标签索引值
  offset: number // 文本的偏移量
}

export function getDomMeta(node: Node, offset: number) {
  const { root, mode } = getOption()
  const orinalParent = mode === Mode.reserve ? getOrinalParent(node) : getSingleOrinalParent(node)
  const preOffset = getTextPreOffset(orinalParent, node)
  const index = orinalParent === root ? ROOT_INDEX : queryDomIndex(orinalParent, root)

  return { tagName: orinalParent.tagName, index, offset: preOffset + offset }
}
