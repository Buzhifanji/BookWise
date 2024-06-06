import { BookshelftMode, ReadMode } from '@renderer/enum'
import { useStorage } from '@vueuse/core'

interface SettingState {
  isOpenNew: boolean // 是否打开新页面
  isFoldCatalog: boolean // 目录是显示折叠效果，还是全面展开
  readMode: ReadMode // 阅读模式
  bookself: BookshelftMode // 书架模式
  isOpenRecyleBin: boolean // 是否打开回收站
}

const defaultState: SettingState = {
  isOpenNew: true,
  isFoldCatalog: false,
  readMode: ReadMode.sroll,
  bookself: BookshelftMode.bookshelf,
  isOpenRecyleBin: true
}

/**
 * 存储设置项
 */
export const settingStore = useStorage<SettingState>(
  'book-wise_setting',
  defaultState,
  localStorage,
  { mergeDefaults: true }
)
