import { INTERNAL_ERROR_EVENT, errorEventEimtter } from "../event";
import { ERROR } from "../util/err";
import { isTextNode } from "../util/is";
import { SelectNode, SelectTextNode } from "./interface";

/**
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Text/splitText
 *
 * 从开始到结束节点直接的所有Node节点
 */
export function getAllSelectDom(start: SelectTextNode, end: SelectTextNode) {
  const { node: startNode, offset: startOffset } = start;
  const { node: endNode, offset: endOffset } = end;

  if (!startNode) {
    errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
      type: ERROR.HIGHLIGHT_SOURCE_SELECTION_NOTE,
      error: `Can't get start note in getAllSelectDom method action.The startNode is: ${startNode}`,
      startNode: start
    })
    return [];
  }

  if (!endNode) {
    errorEventEimtter.emit(INTERNAL_ERROR_EVENT, {
      type: ERROR.HIGHLIGHT_SOURCE_SELECTION_NOTE,
      error: `Can't get start note in getAllSelectDom method action.The startNode is: ${endNode}`,
      endNode: end
    })
    return [];
  }

  if (startNode === endNode && isTextNode(startNode)) {
    return sameTextNode(startNode as Text, startOffset, endOffset);
  }

  const parentNode = findFirstSameParentNode(start.parent, end.parent)!

  return spaceTextNode(parentNode, start, end)

}

function sameTextNode(text: Text, startOffset: number, endOffset: number): SelectNode[] {
  // todo exceptSelectors
  text.splitText(startOffset);

  const node = text.nextSibling as Text;

  node.splitText(endOffset - startOffset);

  return [{ node }];
}

function spaceTextNode(node: HTMLElement, start: SelectTextNode, end: SelectTextNode) {
  const stack: HTMLElement | Node[] = [node]
  const result: SelectNode[] = [];

  let currentNode: HTMLElement | Node | undefined = undefined;
  let withinSelectedRange = false

  while ((currentNode = stack.pop())) {
    // todo exceptSelectors

    const children = currentNode.childNodes;

    for (let i = children.length - 1; i >= 0; i--) {
      stack.push(children[i] as Node);
    }


    if (currentNode === start.node) {
      // 收集开始文本节点
      if (isTextNode(currentNode)) {
        (currentNode as Text).splitText(start.offset);

        const node = currentNode.nextSibling as Text;

        result.push({ node });

      }

      withinSelectedRange = true

    } else if (currentNode === end.node) {
      // 收集结束文本节点
      if (isTextNode(currentNode)) {
        const node = currentNode as Text;

        node.splitText(end.offset);
        result.push({ node });
      }

      break
    } else if (withinSelectedRange && isTextNode(currentNode)) {
      // 收集中间文本节点
      result.push({ node: currentNode as Text });
    }
  }

  return result
}


function findFirstSameParentNode(start: HTMLElement, end: HTMLElement) {
  if (start.contains(end)) return start

  if (end.contains(start)) return end

  let current = start.parentElement
  while (true && current) {
    if (current.contains(end)) {
      return current
    }
    current = current.parentElement
  }
}
