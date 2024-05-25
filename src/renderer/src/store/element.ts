import { defineStore } from "pinia"
import { ref } from "vue"

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