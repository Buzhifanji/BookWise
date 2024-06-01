import { Doc, DomSource } from "../interface";
import { isNull } from "../util/is";
import { getDomNode } from "./dom";
import { getAllSelectDom } from "./selection";

export function getSelectNodes(source: DomSource, root: Doc) {
  const { startDomMeta, endDomMeta } = source;

  const startNode = getDomNode({ source, domMeta: startDomMeta, root })
  if (isNull(startNode)) {
    return null
  }

  const endNode = getDomNode({ source, domMeta: endDomMeta, root }, false)
  if (isNull(endNode)) {
    return null
  }

  return getAllSelectDom(startNode, endNode);
}