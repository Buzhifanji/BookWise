/**
 * 将 Blob 转换为 Data URL（base64 编码的字符串）
 * @param blob
 * @returns
 */
export const convertBlobToBase64 = (blob: Blob) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        const base64String = (reader.result as string).split(',')[1]
        resolve(base64String)
      } else {
        resolve('')
      }
    }
    reader.readAsDataURL(blob)
  })
}

export const convertBlobToUint8Array = async (blob?: Blob) => {
  if (blob) {
    const arrayBuffer = await blob.arrayBuffer()
    return new Uint8Array(arrayBuffer)
  }

  return new Uint8Array()
}
