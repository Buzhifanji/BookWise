export function formatFileSize(bytes: number, decimalPlaces = 2) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimalPlaces
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function formatDecimal(val: number | string, decimal = 2) {
  return +Number(val).toFixed(decimal)
}
