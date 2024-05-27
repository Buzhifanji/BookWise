const key = 'book—wise__language'

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

  return result
}
