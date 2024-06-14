/**
 * 划词颜色
 */

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
