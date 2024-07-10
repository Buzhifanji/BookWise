export function flatten<T>(array: T[], depth = 1) {
  const result: T[] = []
  for (const item of array) {
    if (Array.isArray(item) && depth > 0) {
      // 如果是数组并且深度大于 0，递归调用 flatten 函数
      result.push(...flatten(item, depth - 1))
    } else {
      // 否则直接将元素添加到结果数组中
      result.push(item)
    }
  }
  return result
}

export const arrayBufferConvert = async (arrayBuffer: ArrayBuffer): Promise<AudioBuffer> => {
  const audioContext = new AudioContext()
  return await audioContext.decodeAudioData(arrayBuffer)
}
