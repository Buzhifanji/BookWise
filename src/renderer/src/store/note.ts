import { useStorage } from '@vueuse/core'

interface NoteNavbar {
  sortBy: 'addTime' | 'bookName' // 按什么排序
  isUp: boolean // 是不是升序
}

const defaultData: NoteNavbar = {
  sortBy: 'addTime', // 按什么排序
  isUp: true // 是不是升序
}

export const noteNavbarStore = useStorage<NoteNavbar>(
  'book-wise_note_navbar',
  defaultData,
  localStorage,
  {
    mergeDefaults: true
  }
)

export const changNavbarStore = <T extends keyof NoteNavbar>(key: T, value: NoteNavbar[T]) => {
  noteNavbarStore.value[key] = value
}
