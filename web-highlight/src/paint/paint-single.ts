import { INTERNAL_ERROR_EVENT, errorEventEimtter } from "../event";
import { Hook, handleHookCall } from "../hook";
import { Doc, DomSource } from "../interface";
import { Store } from "../store";
import { isLen } from "../util/array";
import { DATA_WEB_HIGHLIGHT } from "../util/const";
import { getAttr, selctorAll } from "../util/dom";
import { ERROR } from "../util/err";
import { isHighlightWrapNode } from "../util/is";
import { PaintSingle, SelectNode, WrapNode } from "./interface";
import { getSelectNodes } from "./select-node";
import { createWrap, warpToRemove } from "./wrap";

export function paintSingle({ selectNodes, source, root, store, selectNodeHook, wrapNodeHook, removeSourceHook }: PaintSingle) {
  // 处理边界：判断首位是否有交集，有的话就需要把旧和新的合并

  // 处理开始节点是否有交集
  const startNodeSource = getOldWrapSource(selectNodes[0], store)
  if (startNodeSource) {
    source.startDomMeta = startNodeSource.startDomMeta
  }

  // 处理结束节点是否有交集
  let endNodeSource: DomSource | null = null
  const endNode = selectNodes[selectNodes.length - 1]
  if (endNode) {
    endNodeSource = getOldWrapSource(endNode, store)
    if (endNodeSource) {
      source.endDomMeta = endNodeSource.endDomMeta
    }
  }


  const oldIds = getPaintedIds(selectNodes)
  // 删除旧的高亮节点
  removeOldWrap(oldIds, root, store, removeSourceHook)

  // 整合好source和dom后，重新获取selectNodes 数据
  if (startNodeSource || endNodeSource) {

    selectNodes = getSelectNodes(source, root) || selectNodes
  }

  selectNodes = handleHookCall(selectNodes, selectNodeHook, source.id, [])

  const res = paint(selectNodes, source, wrapNodeHook)

  const doms = selctorAll(`${source.tagName}[${DATA_WEB_HIGHLIGHT}='${source.id}']`, root)
  if (isLen(doms)) {
    source.text = doms.reduce((acc, cur) => acc += cur.innerHTML, '')
  } else {
    errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
      type: ERROR.HIGHLIGHT_DOM_NOT_FOUND,
      error: `Can't find the highlight dom by the id 【${source.id}】`,
      detail: source
    })
  }

  return { wrap: res, ids: [...oldIds] }
}

const getNode = (node: SelectNode) => node.node.parentNode as HTMLElement;

function getWrapId(selectNode: SelectNode) {
  let result: string = ''
  const node = getNode(selectNode)
  if (isHighlightWrapNode(node)) {
    result = getAttr(node, DATA_WEB_HIGHLIGHT)
  }

  return result
}

export function getPaintedIds(selectNodes: SelectNode[]) {
  const result = new Set<string>()

  selectNodes.forEach(selectNode => {
    const node = getNode(selectNode)
    if (isHighlightWrapNode(node)) {
      const id = getAttr(node, DATA_WEB_HIGHLIGHT)
      if (id) {
        result.add(id)
      }
    }
  })

  return result
}

function removeOldWrap(ids: Set<string>, root: Doc, store: Store, removeSourceHook: Hook<HTMLElement>) {
  const removeDoms: HTMLElement[] = [];

  ids.forEach(id => {
    const source = store.get(id)
    if (source) {

      const doms = selctorAll(`${source.tagName}[${DATA_WEB_HIGHLIGHT}='${id}']`, root)

      removeDoms.push(...doms)

      store.remove(id)

    } else {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HIGHLIGHT_SOURCE_STORE_NOT_FOUND,
        error: `Can't find the source in the cache store by the id 【${id}】.it happened at the removeOldWrap function execute.`,
        detail: source
      })
    }
  })

  warpToRemove(removeDoms, removeSourceHook)
}

function getOldWrapSource(selectNode: SelectNode, store: Store) {
  let result: DomSource | null = null;

  const id = getWrapId(selectNode)

  if (id) {
    const source = store.get(id)
    if (source) {
      result = source
    } else {
      errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
        type: ERROR.HIGHLIGHT_SOURCE_STORE_NOT_FOUND,
        error: `Can't find the source in the cache store by the id 【${id}】.it happened at the getOldWrapSource function execute.`,
        detail: source
      })
    }
  }

  return result
}

function paint(selectNodes: SelectNode[], source: DomSource, wrapNodeHook: Hook<HTMLElement>) {
  const { id, tagName, className } = source

  return selectNodes.map((select) => {
    let res = paintItemNode({ node: select.node, id, className, tagName });

    res = handleHookCall(res, wrapNodeHook, id, res)

    return res
  });
}

function paintItemNode(wrapNode: WrapNode) {
  const result = createWrap(wrapNode);

  // 规划化 DOM，因为 Text.splitText() 的时，如果指定的偏移量刚好等于原文本节点所包含字符串的长度，则返回一个内容为空的文本节点。
  // 调用 normalize 会删除这些空的文本节点
  result.normalize();

  return result
}
