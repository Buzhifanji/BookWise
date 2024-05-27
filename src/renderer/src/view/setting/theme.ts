import { SelectItem } from '@renderer/components'
import { StorageSelect } from '@renderer/shared'

const key = 'book—wise__theme'

const update = (value: SelectItem) =>
  document.querySelector('html')?.setAttribute('data-theme', value.value)

const data = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset'
]

const themes: SelectItem[] = data.map((item) => ({ id: item, value: item }))

export const themeStore = new StorageSelect(key, themes, update)
