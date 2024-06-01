import { Hook } from "../hook";
import { isLen } from "../util/array";
import { DATA_WEB_HIGHLIGHT, DATA_WEB_HIGHLIGHT_EXTRA, ID_DIVIDION } from "../util/const";
import { addClass, appendChild, createFragment, getAttr, removeAllClass, setAttr } from "../util/dom";
import { getNodeExtraId, getUpperLevelDom } from "./dom";
import { WrapNode } from "./interface";

export function createEleByTagName(tagName: string, id: string, className: string, extraInfo?: string) {
  const wrap = document.createElement(tagName);

  setAttr(wrap, DATA_WEB_HIGHLIGHT, id)

  if (extraInfo) {
    setAttr(wrap, DATA_WEB_HIGHLIGHT_EXTRA, extraInfo)
  }

  addClass(wrap, className)

  return wrap;
}

export function createWrap({ node, id, className, tagName }: WrapNode) {
  const wrap = createEleByTagName(tagName, id, className);

  appendChild(wrap, node)
  node.parentNode?.replaceChild(wrap, node);

  return wrap;
}


/**
 * 在已经是高亮的基础上进行切割
 */
export function spliteWrap({ node, id, className, tagName }: WrapNode) {
  const fragment = createFragment();

  const { parent, prev, next } = getUpperLevelDom(node);

  const extraInfo = getNodeExtraId(parent) || '';

  const wrap = createEleByTagName(tagName, id, className, extraInfo);

  appendChild(wrap, node)

  const cloneNode = (node: Node) => {
    if (node) {
      const span = parent.cloneNode(false);

      span.textContent = node.textContent;

      fragment.appendChild(span)
    }
  };

  // prev
  cloneNode(prev);

  fragment.appendChild(wrap);

  // next
  cloneNode(next);

  parent.parentNode?.replaceChild(fragment, parent);

  parent.parentNode?.normalize()

  return wrap;
}

export function updateWrapAttr({ node, id, className }: WrapNode) {
  const wrap = node.parentNode as HTMLElement;

  removeAllClass(wrap)

  addClass(wrap, className)

  setAttr(wrap, DATA_WEB_HIGHLIGHT, id)

  const extraId = getNodeExtraId(wrap);

  if (extraId) {
    setAttr(wrap, DATA_WEB_HIGHLIGHT_EXTRA, extraId)
  }

  return wrap;
}

export function warpToRemove(nodes: HTMLElement[], removeSourceHook: Hook<HTMLElement>) {
  nodes.forEach((node) => {

    if (!removeSourceHook.isEmpty()) {
      const id = getAttr(node, DATA_WEB_HIGHLIGHT)
      removeSourceHook.call(id, node)
    }

    const parent = node.parentNode!;
    const fragment = createFragment();

    node.childNodes.forEach((child) =>
      appendChild(fragment, child)
    );

    parent.replaceChild(fragment, node);

    parent.normalize()
  });
}

export function wrapToUpdate(nodes: HTMLElement[]) {
  nodes.forEach((node) => {
    const ids = getAttr(node, DATA_WEB_HIGHLIGHT_EXTRA).split(ID_DIVIDION);
    const newId = ids.pop()!;

    setAttr(node, DATA_WEB_HIGHLIGHT, newId)

    if (isLen(ids)) {
      setAttr(node, DATA_WEB_HIGHLIGHT_EXTRA, ids.join(ID_DIVIDION))
    }
  });
}