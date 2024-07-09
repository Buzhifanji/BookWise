import { Bookshelf } from '@renderer/batabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookshelfStore = defineStore('useBookshelfStore', () => {
  const bookshelf = ref<Bookshelf[]>([])

  function setBookshelf(val: any) {
    bookshelf.value = val
  }

  return { bookshelf, setBookshelf }
})
