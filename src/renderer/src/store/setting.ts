import { BookshelftMode, NoteMode, ReadMode } from '@renderer/data'
import { isElectron } from '@renderer/shared'
import { get, set, useStorage } from '@vueuse/core'
import { watchEffect } from 'vue'

interface SettingState {
  isOpenNew: boolean // 是否打开新页面
  isFoldCatalog: boolean // 目录是显示折叠效果，还是全面展开
  readMode: ReadMode // 阅读模式
  bookshelf: BookshelftMode // 书架模式
  noteMode: NoteMode
  isOpenRecycleBin: boolean // 是否打开回收站
  isNoteShowClass: boolean // 笔记是否显示class
  isAutoHighlight: boolean // 选中文字的时候是否自定高亮
  isRemeberPosition: boolean // 是否记住阅读位置
  theme: string // 主题
  lang: string // 语言
  pdfScale: number // PDF展示比例
  listenMode: string // 听书音频模型
}

const defaultState: SettingState = {
  isOpenNew: true,
  isFoldCatalog: false,
  readMode: ReadMode.scroll,
  bookshelf: BookshelftMode.bookshelf,
  noteMode: NoteMode.card,
  isOpenRecycleBin: true,
  isNoteShowClass: false,
  isAutoHighlight: true,
  isRemeberPosition: true,
  theme: 'light',
  lang: 'en',
  pdfScale: 1 * window.devicePixelRatio,
  listenMode: ''
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

if (isElectron) {
  set(settingStore, window.store.get('setting'))
  watchEffect(() => {
    for (const key in defaultState) {
      const val = get(settingStore)[key]
      window.store.set(`setting.${key}`, val)
    }
  })
}

export class ListenMode {
  static set({ id, value }: { id: string; value: string }) {
    const data = get(settingStore).listenMode
    if (data) {
      let obj = {}
      try {
        obj = JSON.parse(data)
      } catch (error) {}
      obj[id] = value
      settingStore.value.listenMode = JSON.stringify(obj)
    } else {
      settingStore.value.listenMode = JSON.stringify({ [id]: value })
    }
  }

  static get(id: string) {
    const data = get(settingStore).listenMode
    if (data) {
      let obj = {}
      try {
        obj = JSON.parse(data)
      } catch (error) {}
      return obj[id] || ''
    } else {
      return ''
    }
  }
}
