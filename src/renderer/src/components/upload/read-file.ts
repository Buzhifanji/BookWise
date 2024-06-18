import { concatArrayBuffers } from '@renderer/shared'
import SparkMD5 from 'spark-md5'

const chunkSize = 1024 * 1024 * 10 // 每个分片的大小，以每片10MB大小来逐次读取;

function readChunk(chunk: Blob) {
  return new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(chunk)

    // 存储读取结果
    reader.onload = function (event) {
      resolve(event.target!.result as ArrayBuffer)
    }

    reader.onerror = function (event) {
      reject(event.target!.error)
    }
  })
}

/**
 * 读取单个文件
 * @param file
 * @returns
 */
async function readFileInChunks(file: File) {
  const size = file.size
  const spark = new SparkMD5.ArrayBuffer()
  let buffer = new ArrayBuffer(0)

  for (let start = 0; start < size; start += chunkSize) {
    const end = Math.min(start + chunkSize, size)
    const chunkBlob = file.slice(start, end)
    const chunk = await readChunk(chunkBlob)
    buffer = concatArrayBuffers(buffer, chunk)
    spark.append(chunk)
  }

  const hash = spark.end()
  console.log('hash: ', hash)

  return { data: buffer, hash, file }
}

export async function readFiles(files: File[]) {
  return await Promise.all(files.map(readFileInChunks))
}
