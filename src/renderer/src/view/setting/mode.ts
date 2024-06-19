import { BookshelftMode, ReadMode } from '@renderer/enum'

export const readModeList = [
  { id: ReadMode.sroll, value: '滚动模式' },
  { id: ReadMode.section, value: '章节模式' },
  { id: ReadMode.double, value: '双页模式' }
]

export const bookshelfModeList = [
  { id: BookshelftMode.bookshelf, value: '书架模式' },
  { id: BookshelftMode.card, value: '卡片模式' },
  { id: BookshelftMode.list, value: '列表模式' }
]
