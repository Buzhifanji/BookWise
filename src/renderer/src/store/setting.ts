import { useStorage } from '@vueuse/core'

interface SettingState {
  isOpenNew: boolean // 是否打开新页面
  isFoldCatalog: boolean // 目录是显示折叠效果，还是全面展开
}

const defaultState: SettingState = {
  isOpenNew: true,
  isFoldCatalog: false
}

/**
 * 存储设置项
 */
export const settingStore = useStorage<SettingState>('my-store', defaultState)
