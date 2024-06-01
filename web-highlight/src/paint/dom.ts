import { INTERNAL_ERROR_EVENT, errorEventEimtter } from "../event";
import { Doc, DomMeta, DomSource } from "../interface";
import { DATA_WEB_HIGHLIGHT, DATA_WEB_HIGHLIGHT_EXTRA, ID_DIVIDION } from "../util/const";
import { getAttr, selctorAll } from "../util/dom";
import { ERROR } from "../util/err";
import { isNull } from "../util/is";
import { DomMetaAndDoc, SelectTextNode } from "./interface";
import { getTextNodeByOffset } from "./offset";

export function getPaintedDoms(tagName: string, dataId: string, root: Doc) {
  const selctor = `${tagName}[${DATA_WEB_HIGHLIGHT}='${dataId}']`;
  return selctorAll(selctor, root)
}

function getDomByTagNameIndex({ tagName, index }: DomMeta, root: Doc, source: DomSource) {
  const doms = selctorAll(tagName, root)
  if (index < 0 || index > doms.length) {
    errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
      type: ERROR.HIGHLIGHT_SOURCE_DOM_META_INDEX,
      error: `cann't find element by 【 tagName: ${tagName} 】 and  【 index: ${index} 】`,
      detail: source
    })
    return null
  }

  return doms[index]
}

export function getDomNode({ source, root, domMeta }: DomMetaAndDoc, isStart = true): SelectTextNode | null {
  const dom = getDomByTagNameIndex(domMeta, root, source)
  const parentOffset = domMeta.offset

  if (isNull(dom)) {
    return null
  }

  const node = getTextNodeByOffset(dom, parentOffset, isStart);

  return { parent: dom, parentOffset, ...node };
}

export function getUpperLevelDom(node: Node) {
  const parent = node.parentNode as HTMLElement;
  const prev = node.previousSibling as Node;
  const next = node.nextSibling as Node;
  return { parent, prev, next };
}

export function getNodeExtraId(node: HTMLElement) {
  const id = getAttr(node, DATA_WEB_HIGHLIGHT);
  const extraId = getAttr(node, DATA_WEB_HIGHLIGHT_EXTRA);
  return extraId ? extraId + ID_DIVIDION + id : id;
}
