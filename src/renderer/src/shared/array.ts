/**
 * 把一维数组切割成二位数组
 * @param arr
 * @param size
 * @returns
 */
export function chuankArray<T>(arr: T[], size: number) {
  if (arr.length === 0) return []
  if (size <= 0) return []

  const result: T[][] = []

  for (let i = 0; i < arr.length; i += size) {
    const end = Math.min(i + size, arr.length)
    result.push(arr.slice(i, end))
  }
  return result
}

/**
 * 合并两个ArrayBuffer
 * @param buffer1
 * @param buffer2
 * @returns
 */
export function concatArrayBuffers(buffer1: ArrayBuffer, buffer2: ArrayBuffer): ArrayBuffer {
  const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength)
  tmp.set(new Uint8Array(buffer1), 0)
  tmp.set(new Uint8Array(buffer2), buffer1.byteLength)
  return tmp.buffer
}
