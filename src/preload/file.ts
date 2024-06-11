/**
 * 分片读取文件
 * @param filePath
 * @returns
 */
const readChunk = (filePath: string) => {
  const chunkSize = 1024 * 1024 * 10 // 每个分片的大小，以每片10MB大小来逐次读取;

  return new Promise<Uint8Array>(async (resolve, reject) => {
    const fs = await import('fs')
    const fileStream = fs.createReadStream(filePath, {
      highWaterMark: chunkSize
    })

    let result = Buffer.alloc(0)

    fileStream.on('data', (chunk) => {
      // 处理分片数据
      result = Buffer.concat([result, chunk as Buffer])
    })

    // 处理读取结束
    fileStream.on('end', () => {
      resolve(new Uint8Array(result))
    })

    // 处理读取错误
    fileStream.on('error', (err) => {
      reject(err)
    })
  })
}

export const readFile = async (url: string) => {
  const fs = await import('fs')
  if (!fs.existsSync(url)) return null

  try {
    return await readChunk(url)
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getFilePath = async (file: File) => {
  const { webUtils } = await import('electron')
  return webUtils.getPathForFile(file)
}
