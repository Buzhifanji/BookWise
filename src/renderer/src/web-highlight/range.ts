import { getOption } from './option'

class RangeUtil {
  prev: Range | null = null

  getRange() {
    let result: Range | null = null
    const selection = getOption().context.getSelection()
    if (selection && !selection.isCollapsed) {
      result = selection.getRangeAt(0)
    }

    // 第一次获取到Range对象，但没有关闭，此时第二次点击了Range对象，这个时候应该关闭range对象，不然上层会引发bug
    if (this.prev && this.prev === result) {
      result = null
    }

    this.prev = result

    return result
  }

  removeAll() {
    const selection = getOption().context.getSelection()
    if (selection && selection.rangeCount > 0) {
      selection.removeAllRanges()
    }
    this.prev = null
  }
}

export const rangeUtil = new RangeUtil()
