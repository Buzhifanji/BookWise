import { Note } from '@renderer/batabase'
import { set, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface NoteNavbar {
  sortBy: 'addTime' | 'bookName' // 按什么排序
  isUp: boolean // 是不是升序
}

const defaultData: NoteNavbar = {
  sortBy: 'addTime', // 按什么排序
  isUp: true // 是不是升序
}

// 笔记排序
export const noteSortStore = useStorage<NoteNavbar>(
  'book-wise_note_navbar',
  defaultData,
  localStorage,
  {
    mergeDefaults: true
  }
)

// 笔记过滤
export const useFilterNoteStore = defineStore('useFilterNoteStore', () => {
  const eBookId = ref('') // eBookId
  const tags = ref<string[]>([]) // 标签
  const searchTag = ref<{ id: string; value: string }>() // 搜索的标签

  function setEBookId(val: string) {
    set(eBookId, val)
  }

  function setTags(val: string[]) {
    set(tags, val)
  }

  function setSearchTag(val: { id: string; value: string } | undefined) {
    set(searchTag, val)
  }

  return { eBookId, setEBookId, tags, setTags, searchTag, setSearchTag }
})

export const changNoteSortStore = <T extends keyof NoteNavbar>(key: T, value: NoteNavbar[T]) => {
  noteSortStore.value[key] = value
}

export const useNoteStore = defineStore('useNoteStore', () => {
  const noteList = ref<Note[]>([])
  function setNoteList(val: Note[]) {
    set(noteList, val)
  }
  return { noteList, setNoteList }
})
