import { SelectItem } from '@renderer/components'
import { ref } from 'vue'

const key = 'book—wise__theme'

function getDefaultTheme() {
  const cache = localStorage.getItem(key)
  let result = themes[0]
  if (cache) {
    for (const item of themes) {
      if (item.value === cache) {
        result = item
        break
      }
    }
  }

  console.log('result', result)

  return result
}

export const themes: SelectItem[] = [
  { value: 'light' },
  { value: 'dark' },
  { value: 'cupcake' },
  { value: 'bumblebee' },
  { value: 'emerald' },
  { value: 'corporate' },
  { value: 'synthwave' },
  { value: 'retro' },
  { value: 'cyberpunk' },
  { value: 'valentine' },
  { value: 'halloween' },
  { value: 'garden' },
  { value: 'forest' },
  { value: 'aqua' },
  { value: 'lofi' },
  { value: 'pastel' },
  { value: 'fantasy' },
  { value: 'wireframe' },
  { value: 'black' },
  { value: 'luxury' },
  { value: 'dracula' },
  { value: 'cmyk' },
  { value: 'autumn' },
  { value: 'business' },
  { value: 'acid' },
  { value: 'lemonade' },
  { value: 'night' },
  { value: 'coffee' },
  { value: 'winter' },
  { value: 'dim' },
  { value: 'nord' },
  { value: 'sunset' }
]

export function initTheme() {
  const value = localStorage.getItem(key) || 'light'
  setTheme({ value })
}

export function setTheme({ value }: SelectItem) {
  localStorage.setItem(key, value)
  document.querySelector('html')?.setAttribute('data-theme', value)
}

export const selectedTheme = ref(getDefaultTheme())
