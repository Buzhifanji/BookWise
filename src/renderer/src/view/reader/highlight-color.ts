/**
 * 划词颜色
 */

import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

const _colorNames = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'emerald',
  'cyan',
  'blue',
  'violet',
  'fuchsia',
  'rose'
  // 'primary',
  // 'secondary',
  // 'accent',
  // 'neutral',
  // 'info',
  // 'success',
  // 'warning',
  // 'error'
] as const

type Keys = (typeof _colorNames)[number]

// 配色来源： https://daisyui.com/docs/colors/
class HighlightColor {
  selectColor: Keys = 'orange'

  changeSelectColor = (value: Keys) => {
    this.selectColor = value
  }

  getSelectionClassName = () => {
    return `selection-${this.selectColor}`
  }

  getSelection = () => {
    const value = this.selectColor
    return `selection:bg-${value} selection:text-${value}`
  }

  // selectionColors = () => {}
}

export const highlightColor = new HighlightColor()

const storage = 'book-wise_selection-color'
export const defaultColor = useStorage(storage, 'blue')

// 划词颜色 列表
export const colorNames = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'emerald',
  'cyan',
  'blue',
  'violet',
  'fuchsia',
  'rose'
]

// 默认 划词颜色
export const selectionColor = computed(
  () => `selection:bg-${defaultColor.value}-300 selection:text-${defaultColor.value}-900`
)

// 根据颜色名 获取划词颜色
export function getBadgeColorByColorName(colorName: string) {
  return `bg-${colorName}-300 border-${colorName}-300 `
}

// 根据 class名 获取划词颜色
export function getBadgeColorByClassName(className: string) {
  const name = className.replace('selection-', '')
  return getBadgeColorByColorName(name)
}

export function getTextColor(className = defaultColor.value) {
  return `selection-${className}`
}

export function getBadges(className: string) {
  return colorNames.filter((name) => !className.includes(name))
}

export function changeDefaultSelectedColor(colorName: string) {
  defaultColor.value = colorName
}
