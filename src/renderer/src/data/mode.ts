import { computed } from 'vue'
import { BookshelftMode, NoteMode, ReadMode } from './enum'
import { t } from './language'

export const readModeList = computed(() => {
  return [
    { id: ReadMode.scroll, value: t('readMode.scroll') },
    { id: ReadMode.section, value: t('readMode.section') },
    { id: ReadMode.double, value: t('readMode.double') }
  ]
})
export const getSelectReadMode = (readMode: ReadMode) => {
  return readModeList.value.find((item) => item.id === readMode)?.value
}

export const bookshelfModeList = computed(() => {
  return [
    { id: BookshelftMode.bookshelf, value: t('bookMode.bookshelf') },
    { id: BookshelftMode.card, value: t('bookMode.card') },
    { id: BookshelftMode.list, value: t('bookMode.list') }
  ]
})
export const getSelectBookshelfMode = (bookshelfMode: BookshelftMode) => {
  return bookshelfModeList.value.find((item) => item.id === bookshelfMode)?.value
}

export const nodeModeList = computed(() => {
  return [
    { id: NoteMode.card, value: '卡片模式' },
    { id: NoteMode.list, value: '列表模式' }
  ]
})
export const selectNodeMode = (nodeMode: NoteMode) => {
  return nodeModeList.value.find((item) => item.id === nodeMode)?.value
}
