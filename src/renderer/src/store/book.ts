import { Book } from '@renderer/batabase'
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

export type BookSortType =
  | 'addTime'
  | 'updateTime'
  | 'readTime'
  | 'readProgress'
  | 'bookName'
  | 'author'
  | 'score'

interface BookSort {
  sortBy: BookSortType
  isUp: boolean // 是不是升序
}

export const deaultBookSort: BookSort = {
  sortBy: 'updateTime',
  isUp: false
}

// 书籍排序
export const bookSortStore = useStorage('book-wise_book_sort', deaultBookSort, localStorage, {
  mergeDefaults: true
})

export const changeBookSortStore = <T extends keyof BookSort>(key: T, value: BookSort[T]) => {
  bookSortStore.value[key] = value
}

// 书籍过滤
export const useBookFilterStore = defineStore('useBookFilterStore', () => {
  const bookshelf = ref('') // 书架

  function setBookshelf(val: string) {
    bookshelf.value = val
  }

  return { bookshelf, setBookshelf }
})

// 全部书籍
export const useBookStore = defineStore('useBookStore', () => {
  const bookList = ref<Book[]>([])

  function setBookList(val: any) {
    bookList.value = val
  }

  return { bookList, setBookList }
})
