import { isTextNode } from "../util/is";
import { DomNode } from "./interface";

const getTextLen = (node: Node) => node!.textContent!.length;

/**
 * 根据偏移量找到点击的文本节点
 */
export function getTextNodeByOffset(parent: HTMLElement, offset: number, isStart = true): DomNode {
  const nodeStack: Node[] = [parent];

  let currentNode: Node | undefined = undefined;
  let curOffset = 0;
  let startOffset = 0;

  while ((currentNode = nodeStack.pop())) {
    const children = currentNode.childNodes;
    for (let i = children.length - 1; i >= 0; i--) {
      nodeStack.push(children[i]);
    }

    if (isTextNode(currentNode)) {
      startOffset = offset - curOffset;
      curOffset += getTextLen(currentNode);

      // fixed: 覆盖上一个 warp 节点的时候，会多出一个空的 wrap
      const handler = isStart ? curOffset > offset : curOffset >= offset;
      if (handler) {
        break;
      }
    }
  }

  if (!currentNode) {
    currentNode = parent;
  }

  return { node: currentNode, offset: startOffset };
}
