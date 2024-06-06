import { Doc } from '../interface'
import { from, indexOf } from './array'

export function selector(selector: string, doc?: Doc) {
  const $root = doc || document
  return $root.querySelector<HTMLElement>(selector)
}

export function selctorAll(selector: string, doc?: Doc) {
  const $root = doc || document
  return from($root.querySelectorAll<HTMLElement>(selector))
}

/**
 * 在doms列表中查找制定dom的索引
 */
export function queryDomIndex(node: HTMLElement, root: Doc): number {
  const nodeList = selctorAll(node.tagName, root)
  return indexOf(nodeList, node)
}

export function unListener(el: Doc, type: string, fn: EventListenerOrEventListenerObject) {
  return el?.removeEventListener(type, fn)
}

export function listener(el: Doc, type: string, fn: EventListenerOrEventListenerObject) {
  el.addEventListener(type, fn, { capture: false })

  return () => unListener(el, type, fn)
}

export function addClass(el: HTMLElement, className: string) {
  const name = className.split(',')

  el.classList.add(...name)
}

export function removeClass(el: HTMLElement, className: string) {
  el.classList.remove(className)
}

export function replaceClass(el: HTMLElement, newClassName: string, oldClassName: string) {
  return el.classList.replace(oldClassName, newClassName)
}

export function removeAllClass(el: HTMLElement) {
  el.className = ''
}

export function hasClass(el: HTMLElement, className: string): boolean {
  return el.classList.contains(className)
}

export function setAttr(el: HTMLElement, key: string, value: string) {
  el.setAttribute(key, value)
}

export function getAttr(el: HTMLElement, key: string) {
  return el.getAttribute(key) || ''
}

export function hasAttr(el: HTMLElement, key: string) {
  return el.hasAttribute(key)
}

export function createFragment() {
  return document.createDocumentFragment()
}

export function appendChild(el: HTMLElement | DocumentFragment, child: Node) {
  el.appendChild(child.cloneNode(false))
}
