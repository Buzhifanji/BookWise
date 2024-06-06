import { INTERNAL_ERROR_EVENT, errorEventEimtter } from './event'
import { DomSource } from './interface'
import { getSectionConatiner } from './meta'
import { Mode } from './mode'
import { getOption } from './option'
import { SelectNode, getSelectNodes } from './select-note'
import { Store } from './store'
import { isLen } from './util/array'
import { DATA_WEB_HIGHLIGHT, DATA_WEB_HIGHLIGHT_EXTRA, ID_DIVIDION } from './util/const'
import {
  addClass,
  appendChild,
  createFragment,
  getAttr,
  removeAllClass,
  selctorAll,
  selector,
  setAttr
} from './util/dom'
import { ERROR } from './util/err'
import { isHighlightWrapNode, isNull, isString } from './util/is'

interface WrapNode {
  node: Node
  // mode: Mode
  id: string
  className: string
  tagName: string
}

const getParentNode = (node: SelectNode) => node.node.parentNode as HTMLElement

const getAllDom = (tagName: string, dataId: string) => {
  const { root } = getOption()
  const data = `${tagName}[${DATA_WEB_HIGHLIGHT}='${dataId}']`

  return selctorAll(data, root)
}

const hasPainted = (tagName: string, dataId: string, page: string) => {
  const root = getSectionConatiner(page)

  if (root) {
    return selector(`${tagName}[${DATA_WEB_HIGHLIGHT}='${dataId}']`, root)
  }

  return null
}

const getPaintedIds = (selectNodes: SelectNode[]) => {
  const result = new Set<string>()

  selectNodes.forEach((selectNode) => {
    const node = getParentNode(selectNode)
    if (isHighlightWrapNode(node)) {
      const id = getAttr(node, DATA_WEB_HIGHLIGHT)
      if (id) {
        result.add(id)
      }
    }
  })

  return result
}

const getUpperLevelDom = (node: Node) => {
  const parent = node.parentNode as HTMLElement
  const prev = node.previousSibling as Node
  const next = node.nextSibling as Node
  return { parent, prev, next }
}

const getNodeExtraId = (node: HTMLElement) => {
  const id = getAttr(node, DATA_WEB_HIGHLIGHT)
  const extraId = getAttr(node, DATA_WEB_HIGHLIGHT_EXTRA)
  return extraId ? extraId + ID_DIVIDION + id : id
}

const getWrapId = (selectNode: SelectNode) => {
  let result: string = ''
  const node = getParentNode(selectNode)
  if (isHighlightWrapNode(node)) {
    result = getAttr(node, DATA_WEB_HIGHLIGHT)
  }

  return result
}

const createEleByTagName = (tagName: string, id: string, className: string, extraInfo?: string) => {
  const wrap = document.createElement(tagName)

  setAttr(wrap, DATA_WEB_HIGHLIGHT, id)

  if (extraInfo) {
    setAttr(wrap, DATA_WEB_HIGHLIGHT_EXTRA, extraInfo)
  }

  addClass(wrap, className)

  return wrap
}

const createWrap = ({ node, id, className, tagName }: WrapNode) => {
  const wrap = createEleByTagName(tagName, id, className)

  appendChild(wrap, node)
  node.parentNode?.replaceChild(wrap, node)

  return wrap
}

const spliteWrap = ({ node, id, className, tagName }: WrapNode) => {
  const fragment = createFragment()

  const { parent, prev, next } = getUpperLevelDom(node)

  const extraInfo = getNodeExtraId(parent) || ''

  const wrap = createEleByTagName(tagName, id, className, extraInfo)

  appendChild(wrap, node)

  const cloneNode = (node: Node) => {
    if (node) {
      const span = parent.cloneNode(false)

      span.textContent = node.textContent

      fragment.appendChild(span)
    }
  }

  // prev
  cloneNode(prev)

  fragment.appendChild(wrap)

  // next
  cloneNode(next)

  parent.parentNode?.replaceChild(fragment, parent)

  parent.parentNode?.normalize()

  return wrap
}

const paintItemNode = (wrapNode: WrapNode) => {
  const result = createWrap(wrapNode)

  // 规划化 DOM，因为 Text.splitText() 的时，如果指定的偏移量刚好等于原文本节点所包含字符串的长度，则返回一个内容为空的文本节点。
  // 调用 normalize 会删除这些空的文本节点
  result.normalize()

  return result
}

const updateWrapAttr = ({ node, id, className }: WrapNode) => {
  const wrap = node.parentNode as HTMLElement

  removeAllClass(wrap)

  addClass(wrap, className)

  setAttr(wrap, DATA_WEB_HIGHLIGHT, id)

  const extraId = getNodeExtraId(wrap)

  if (extraId) {
    setAttr(wrap, DATA_WEB_HIGHLIGHT_EXTRA, extraId)
  }

  return wrap
}

const warpToRemove = (nodes: HTMLElement[]) => {
  nodes.forEach((node) => {
    const parent = node.parentNode!
    const fragment = createFragment()

    node.childNodes.forEach((child) => appendChild(fragment, child))

    parent.replaceChild(fragment, node)

    parent.normalize()
  })
}

const wrapToUpdate = (nodes: HTMLElement[]) => {
  nodes.forEach((node) => {
    const ids = getAttr(node, DATA_WEB_HIGHLIGHT_EXTRA).split(ID_DIVIDION)
    const newId = ids.pop()!

    setAttr(node, DATA_WEB_HIGHLIGHT, newId)

    if (isLen(ids)) {
      setAttr(node, DATA_WEB_HIGHLIGHT_EXTRA, ids.join(ID_DIVIDION))
    }
  })
}

export class PaintUntil {
  constructor(private store: Store) {}
  create(source: DomSource) {
    const { id, tagName, page } = source

    // 检测是否绘制过
    const paintedDoms = hasPainted(tagName, id, page!)
    if (!isNull(paintedDoms)) {
      //已经绘制过了，无需再绘制
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.DARA_DOM_REPEATEDLY,
        error: `The highlight source has painted.`,
        detail: source
      })
      return null
    }

    const selectNodes = getSelectNodes(source)
    if (isNull(selectNodes)) {
      return selectNodes
    }

    if (!isLen(selectNodes)) {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.DOM_SELECTION_EMPTY,
        error: `The selection contains select nodes is empty.`,
        detail: source
      })

      return null
    }

    const mode = getOption().mode

    if (mode === Mode.single) {
      return this.paintSingle(selectNodes, source)
    } else if (mode === Mode.reserve) {
      // 此项目用不上，暂时不处理
      return null
    } else {
      return null
    }
  }

  remove(source: DomSource) {
    const { id, tagName } = source
    const mode = getOption().mode
    const paintedDoms = getAllDom(tagName, id)

    const toRemove: HTMLElement[] = []
    const toUpdate: HTMLElement[] = []

    paintedDoms.forEach((dom) => {
      const extraId = mode === Mode.reserve && getAttr(dom, DATA_WEB_HIGHLIGHT_EXTRA)
      extraId ? toUpdate.push(dom) : toRemove.push(dom)
    })

    warpToRemove(toRemove)

    wrapToUpdate(toUpdate)
  }

  removeAll() {
    const { root, tagName } = getOption()
    const doms = selctorAll(`${tagName}[${DATA_WEB_HIGHLIGHT}]`, root)
    warpToRemove(doms)
  }

  getRemoveIds(source: DomSource) {
    const result: string[] = []

    const selectNodes = getSelectNodes(source)

    if (selectNodes) {
      const oldIds = getPaintedIds(selectNodes)

      result.push(...oldIds)
    }

    return result
  }

  replaceExtraOldWrap(oldId: string, newId: string) {
    const source = this.store.get(oldId)
    if (source && isLen(source)) {
      source.forEach((item) => {
        const oldDoms = getAllDom(item.tagName, oldId)
        oldDoms.forEach((note) => setAttr(note, DATA_WEB_HIGHLIGHT, newId))
      })
    }
  }

  private handleSelectNotes(selectNodes: SelectNode[], source: DomSource) {
    const nodes = selectNodes.map((node) => this.getOldWrapSource(node, source.page))
    const result = new Set<string>()
    let startDomMeta = source.startDomMeta
    let endDomMeta = source.endDomMeta
    let startId: string = ''
    let endId: string = ''
    for (let i = 0; i < nodes.length; i++) {
      const item = nodes[i]
      if (isNull(item)) {
        continue
      } else if (isString(item)) {
        // 特殊情况，store存储的数据丢失了，但界面上存在
        result.add(item)
      } else {
        if (i === 0) {
          // 开始节点有交集
          startDomMeta = item.startDomMeta
          startId = item.id
        }

        if (i === nodes.length - 1) {
          // 结束节点有交集
          endDomMeta = item.endDomMeta
          endId = item.id
        }

        result.add(item.id)
      }
    }

    if (startId && endId && startId === endId) {
      // 无需要绘制
      return null
    } else {
      source.startDomMeta = startDomMeta
      source.endDomMeta = endDomMeta
      return result
    }
  }

  private paintSingle(selectNodes: SelectNode[], source: DomSource) {
    const oldIds = this.handleSelectNotes(selectNodes, source)
    if (!oldIds) {
      return null
    }
    // 删除旧的高亮节点
    this.removeOldWrap(oldIds, source.page)

    // 整合好source和dom后，重新获取selectNodes 数据
    selectNodes = getSelectNodes(source) || selectNodes

    const res = this.paintAction(selectNodes, source)
    const doms = getAllDom(source.tagName, source.id)

    if (isLen(doms)) {
      source.text = doms.reduce((acc, cur) => (acc += cur.innerHTML), '')
    } else {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HIGHLIGHT_DOM_NOT_FOUND,
        error: `Can't find the highlight dom by the id 【${source.id}】`,
        detail: source
      })
    }

    return { wrap: res, ids: [...oldIds] }
  }

  private getOldWrapSource(selectNode: SelectNode, page: string) {
    const id = getWrapId(selectNode)

    if (!id) return null

    const sources = this.store.get(id)
    if (!sources) {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HIGHLIGHT_SOURCE_DOM_META_INDEX,
        error: `Can't find the source in the cache store by the id 【${id}】.it happened at the getOldWrapSource function execute.`
      })

      return id
    }

    const source = sources.find((source) => source.page === page)
    if (!source) {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HIGHLIGHT_SOURCE_DOM_META_INDEX,
        error: `Can't find the source in the cache store by the id 【${id}】 and the page 【${page}】.it happened at the getOldWrapSource function execute.`
      })

      return null
    }

    return source
  }

  private removeOldWrap(ids: Set<string>, page: string) {
    const removeDoms: HTMLElement[] = []
    const root = getSectionConatiner(page)

    ids.forEach((id) => {
      const source = this.store.get(id)
      if (source && isLen(source)) {
        const data = `${source[0].tagName}[${DATA_WEB_HIGHLIGHT}='${id}']`

        const doms = selctorAll(data, root!)

        if (doms) {
          removeDoms.push(...doms)
          this.store.removeOneSource(id, page)
        }
      } else {
        errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
          type: ERROR.HIGHLIGHT_SOURCE_STORE_NOT_FOUND,
          error: `Can't find the source in the cache store by the id 【${id}】.it happened at the removeOldWrap function execute.`
        })
      }
    })

    warpToRemove(removeDoms)
  }

  private paintAction(selectNodes: SelectNode[], source: DomSource) {
    const { id, tagName, className } = source
    return selectNodes.map((select) => {
      return paintItemNode({ node: select.node, id, className, tagName })
    })
  }
}
