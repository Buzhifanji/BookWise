// 详情查看：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getSelection

import { Context } from "../interface";

let prevRange: Range | null = null;

export function getRange(context: Context) {
  let result: Range | null = null;
  const selection = context.getSelection();
  if (selection && !selection.isCollapsed) {
    result = selection.getRangeAt(0)
  }

  // 第一次获取到Range对象，但没有关闭，此时第二次点击了Range对象，这个时候应该关闭range对象，不然上层会引发bug
  if (prevRange && prevRange === result) {
    result = null
  }

  prevRange = result;

  return result;
}

export function removeAllRanges(context: Context) {
  const selection = context.getSelection();
  if (selection && selection.rangeCount > 0) {
    selection.removeAllRanges();
  }
  prevRange = null;
}
