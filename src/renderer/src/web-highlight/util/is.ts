import { DATA_WEB_HIGHLIGHT } from "./const";
import { hasAttr } from "./dom";

const regMobile = /Android|iPhone|BlackBerry|BB10|Opera Mini|Phone|Mobile|Silk|Windows Phone|Mobile(?:.+)Firefox\b/i;

export const isMobile = (userAgent: string) => regMobile.test(userAgent);

export const isUndifend = (val: unknown): val is undefined => val !== undefined

export const isNull = (val: unknown): val is null => val === null;

export const isString = (val: unknown): val is string => typeof val === "string";

export const isTextNode = (node: Node): boolean => node.nodeType === Node.TEXT_NODE;

export const isHighlightWrapNode = (node: HTMLElement): boolean => node && hasAttr(node, DATA_WEB_HIGHLIGHT);

export const isElementNode = (node: Node): boolean => node && node.nodeType === Node.ELEMENT_NODE;

export const isBr = (node: HTMLElement): boolean => node && node.tagName === 'BR';

export const isNodeEmpty = (node: Node): boolean => !node || !node.textContent;