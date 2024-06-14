/**
 * 划词颜色
 */

import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

const _colorNames = ['red', 'yellow', 'emerald', 'cyan', 'violet'] as const

export type ColorKeys = (typeof _colorNames)[number]

export enum HighlightType {
  marker = 'selection', // 高亮
  beeline = 'beeline', // 直线
  wavy = 'wavy' // 波浪线
}

// 配色来源： https://daisyui.com/docs/colors/
class HighlightColor {
  color: ColorKeys = 'yellow'
  type: HighlightType = HighlightType.marker

  changeColor = (value: ColorKeys) => {
    this.color = value
  }

  changeType = (val: HighlightType) => {
    this.type = val
  }

  getClassName = () => {
    return `${this.type}-${this.color}`
  }

  getColors = () => {
    return _colorNames
  }

  getBadgeColor(colorName: string) {
    return `bg-${colorName}-300 border-${colorName}-300 `
  }
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
