import { useWindowSize } from '@vueuse/core'
import { ref } from 'vue'
import Drawer from './Drawer.vue'

export const useToggleDrawer = () => {
  const isLG = ref(false)

  function toggleDrawer() {
    const { width } = useWindowSize()
    if (width.value >= 1024) {
      isLG.value = !isLG.value
    }
  }

  return { isLG, toggleDrawer }
}

export { Drawer }
