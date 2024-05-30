import { useStorage } from '@vueuse/core'

interface SettingState {
  isOpenNew: boolean // 是否打开新页面
}

const defaultState: SettingState = {
  isOpenNew: true
}

/**
 * 存储设置项
 */
export const settingStore = useStorage<SettingState>('my-store', defaultState)
