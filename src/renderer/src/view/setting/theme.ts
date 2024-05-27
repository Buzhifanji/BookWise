import { SelectItem } from '@renderer/components'
import { StorageSelect } from '@renderer/shared'

const key = 'book—wise__theme'

const update = (value: string) => document.querySelector('html')?.setAttribute('data-theme', value)

const themes: SelectItem[] = [
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

export const themeStore = new StorageSelect(key, themes, update)
