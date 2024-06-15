import { BookshelftMode, ReadMode } from '@renderer/enum'
import { useStorage } from '@vueuse/core'

interface SettingState {
  isOpenNew: boolean // 是否打开新页面
  isFoldCatalog: boolean // 目录是显示折叠效果，还是全面展开
  readMode: ReadMode // 阅读模式
  bookself: BookshelftMode // 书架模式
  isOpenRecyleBin: boolean // 是否打开回收站
  isNoteShowClass: boolean // 笔记是否显示class
  isAutoHighlight: boolean // 选中文字的时候是否自定高亮
  theme: string // 主题
  lang: string // 语言
}

const defaultState: SettingState = {
  isOpenNew: true,
  isFoldCatalog: false,
  readMode: ReadMode.sroll,
  bookself: BookshelftMode.bookshelf,
  isOpenRecyleBin: true,
  isNoteShowClass: true,
  isAutoHighlight: true,
  theme: 'light',
  lang: 'en'
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
