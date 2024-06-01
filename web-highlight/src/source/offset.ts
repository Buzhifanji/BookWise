import { isTextNode } from "../util/is";

const getTextLen = (node: Node) => node!.textContent!.length;

/**
 * 找到文本节点的相对源父节点 偏移量
 */
export function getTextPreOffset(orinalParent: Node, textNode: Node): number {
  const nodeStack: Node[] = [orinalParent];

  let currentNode: Node | undefined = undefined;
  let offset = 0;

  while ((currentNode = nodeStack.pop())) {
    const children = currentNode.childNodes;
    for (let i = children.length - 1; i >= 0; i--) {
      nodeStack.push(children[i]);
    }

    if (isTextNode(currentNode)) {
      if (currentNode === textNode) {
        break;
      } else {
        offset += getTextLen(currentNode);
      }
    }
  }
  return offset;
}
