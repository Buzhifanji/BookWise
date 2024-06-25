import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const bookPositionStore = useStorage('book-wise_book_position', {}, localStorage, {
  mergeDefaults: true
})

export const bookReadTimeStore = useStorage('book-wise_book_read_time', {}, localStorage, {
  mergeDefaults: true
})

/**
 * 记录当前阅读到哪一页
 */
export const useBookPageStore = defineStore('useBookPageStore', () => {
  const page = ref(0)

  function setPage(value: number) {
    page.value = value
  }

  return { page, setPage }
})
