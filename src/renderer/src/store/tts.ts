import { set } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTTSStore = defineStore('useTTSStore', () => {
  const locale = ref('zh-CN')
  const voice = ref('zh-CN-XiaoxiaoNeural')

  function setLocal(value: string) {
    set(locale, value)
  }

  function setVoice(value: string) {
    set(voice, value)
  }

  return { locale, setLocal, voice, setVoice }
})
