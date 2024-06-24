import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 存储内容容器宽度
 */
export const useContentCantianerStore = defineStore('useContentCantianerStore', () => {
  const width = ref(100)

  function setWidth(value: number) {
    width.value = value
  }

  return { width, setWidth }
})

/**
 * 存储当前浏览页数
 */
export const useElementPageStore = defineStore('useElementPageStore', () => {
  const elementPage = ref(0)

  function setElementPage(value: number) {
    elementPage.value = value
  }

  return { elementPage, setElementPage }
})
