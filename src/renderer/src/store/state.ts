import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {
  const isGood = ref(false)

  function setGood(value: boolean) {
    isGood.value = value
  }

  return { isGood, setGood }
})
