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
  const totalLength = buffer1.byteLength + buffer2.byteLength

  const mergedArrayBuffer = new ArrayBuffer(totalLength)

  const view1 = new Uint8Array(buffer1)
  const view2 = new Uint8Array(buffer2)
  const mergedView = new Uint8Array(mergedArrayBuffer)

  mergedView.set(view1, 0)
  mergedView.set(view2, view1.length)

  return mergedArrayBuffer
}

export function cloneBuffer(buffer: ArrayBuffer) {
  return new Uint8Array(buffer).slice().buffer
}

export function arrayBufferToFile(val: ArrayBuffer, fileName: string) {
  return new File([new Blob([val])], fileName)
}
