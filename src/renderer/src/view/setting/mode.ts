import { BookshelftMode, ReadMode } from '@renderer/enum'
import { computed } from 'vue'
import { t } from './language'

export const readModeList = computed(() => {
  return [
    { id: ReadMode.sroll, value: t('readMode.scroll') },
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
