import { Tag } from '@renderer/batabase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTagStore = defineStore('useTagStore', () => {
  const tagList = ref<Tag[]>([])

  function setTagList(val: any) {
    tagList.value = val
  }

  return { tagList, setTagList }
})
