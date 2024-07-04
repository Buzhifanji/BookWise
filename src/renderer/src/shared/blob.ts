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

export const convertUint8ArrayToURL = (buffer: Uint8Array) => {
  const blob = new Blob([buffer])
  return URL.createObjectURL(blob)
}

export const fileToUint8Array = (file: File) => {
  return new Promise<Uint8Array>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(new Uint8Array(reader.result as ArrayBuffer))
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsArrayBuffer(file)
  })
}
