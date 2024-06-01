import { Doc, DomMeta } from "../interface";
import { Mode } from "../option";
import { ROOT_INDEX } from "../util/const";
import { queryDomIndex } from "../util/dom";
import { isHighlightWrapNode } from "../util/is";
import { getTextPreOffset } from "./offset";

/**
 * 获取划词最近的一个父节点。
 * @param node
 * @returns
 */
function getOrinalParent(node: Node): HTMLElement {
  if (node instanceof HTMLElement && !isHighlightWrapNode(node)) {
    return node;
  }

  let parent = node.parentNode as HTMLElement;

  while (isHighlightWrapNode(parent)) {
    parent = parent.parentNode as HTMLElement;
  }

  return parent;
}

function getSingleOrinalParent(node: Node): HTMLElement {
  while (!(node instanceof HTMLElement)) {
    node = node.parentNode as Node
  }
  return node
}

export function getDomMeta(
  node: Node,
  offset: number,
  root: Doc,
  mode: Mode,
): DomMeta {
  const orinalParent = mode === Mode.reserve ? getOrinalParent(node) : getSingleOrinalParent(node);
  const preOffset = getTextPreOffset(orinalParent, node);
  const index = orinalParent === root ? ROOT_INDEX : queryDomIndex(orinalParent, root);

  return { tagName: orinalParent.tagName, index, offset: preOffset + offset };
}
