import { useStorage } from '@vueuse/core'

export const bookPositionStore = useStorage('book-wise_book_position', {}, localStorage, {
  mergeDefaults: true
})
