import { Hook, handleHookCall } from "../hook";
import { DomSource } from "../interface";
import { isHighlightWrapNode, isNodeEmpty } from "../util/is";
import { getUpperLevelDom } from "./dom";
import { SelectNode, WrapNode } from "./interface";
import { createWrap, spliteWrap, updateWrapAttr } from "./wrap";

export function paintReserve(selectNodes: SelectNode[], source: DomSource, wrapNodeHook: Hook<HTMLElement>) {
  const { id, tagName, className } = source

  return selectNodes.map((select) => {
    let res = paint({ node: select.node, id, className, tagName });

    res = handleHookCall(res, wrapNodeHook, id, res)

    return res
  });
}

function paint(wrapNode: WrapNode) {
  const { parent, prev, next } = getUpperLevelDom(wrapNode.node);

  let result: HTMLElement;

  if (!isHighlightWrapNode(parent)) {
    // 新建 wrap
    result = createWrap(wrapNode);
  } else if (isHighlightWrapNode(parent) && (!isNodeEmpty(prev) || !isNodeEmpty(next))) {
    result = spliteWrap(wrapNode);
  } else {
    // 覆盖上一个 wrap
    result = updateWrapAttr(wrapNode);
  }

  // 规划化 DOM，因为 Text.splitText() 的时，如果指定的偏移量刚好等于原文本节点所包含字符串的长度，则返回一个内容为空的文本节点。
  // 调用 normalize 会删除这些空的文本节点
  result.normalize();

  return result;
}
