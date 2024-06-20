export function toPrewView(node: HTMLElement, top: number, height: number) {
  let val = top - height
  if (val < 0) val = 0

  node.scrollTo({ top: val, behavior: 'smooth' })
}

export function toNextView(node: HTMLElement, top: number, height: number, total: number) {
  let val = top + height
  if (val > total) val = total

  node.scrollTo({ top: val, behavior: 'smooth' })
}

/// 记录滚动位置
export function recordScrollPosition() {}
