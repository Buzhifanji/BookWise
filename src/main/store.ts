import { ipcMain } from 'electron'
import Store from 'electron-store'

interface SettingState {
  isOpenNew: boolean // 是否打开新页面
  isFoldCatalog: boolean // 目录是显示折叠效果，还是全面展开
  readMode: string // 阅读模式
  bookshelf: string // 书架模式
  noteMode: string
  isOpenRecycleBin: boolean // 是否打开回收站
  isNoteShowClass: boolean // 笔记是否显示class
  isAutoHighlight: boolean // 选中文字的时候是否自定高亮
  isRemeberPosition: boolean // 是否记住阅读位置
  theme: string // 主题
  lang: string // 语言
  pdfScale: number // PDF展示比例
}

const schemaSetting: SettingState = {
  isOpenNew: true,
  isFoldCatalog: false,
  readMode: 'scroll',
  bookshelf: 'bookshelf',
  noteMode: 'card',
  isOpenRecycleBin: true,
  isNoteShowClass: false,
  isAutoHighlight: true,
  isRemeberPosition: true,
  theme: 'light',
  lang: 'en',
  pdfScale: 1
}

const store: any = new Store<{ settting: SettingState }>({
  defaults: { setting: schemaSetting },
  watch: true
})

export function initSettingStore() {
  // 监听来自渲染进程的请求
  ipcMain.on('getStore', <T extends keyof SettingState>(event, key: T) => {
    event.returnValue = store.get(key)
  })

  ipcMain.on('setStore', (_, value) => {
    console.log(value)
    store.set(value.key, value.value)
  })

  ipcMain.on('clearStore', () => {
    store.clear()
  })
}
