import { useStorage } from '@vueuse/core'

export const bookPositionStore = useStorage('book-wise_book_position', {}, localStorage, {
  mergeDefaults: true
})

export const bookReadTimeStore = useStorage('book-wise_book_read_time', {}, localStorage, {
  mergeDefaults: true
})
