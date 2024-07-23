import { Sound } from '@renderer/components'
import { ref } from 'vue'
export const isAudioReadying = ref(false) // 是否准备中
export const sound = new Sound()
