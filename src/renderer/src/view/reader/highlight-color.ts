/**
 * 划词颜色
 */

import { useStorage } from '@vueuse/core'
import { computed } from 'vue'

// 配色来源： https://daisyui.com/docs/colors/
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
