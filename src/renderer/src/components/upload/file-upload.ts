import { color } from 'console-log-colors'
import SparkMD5 from 'spark-md5'

const chunkSize = 1024 * 1024 * 10 // 每个分片的大小，以每片10MB大小来逐次读取;

/**
 * 读取单个文件
 * @param file
 */
function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    let offset = 0
    const spark = new SparkMD5() //创建SparkMD5的实例
    const fileReader = new FileReader()

    fileReader.onload = function () {
      // log.cyanBright('read chunk nr', currentChunk + 1, 'of', chunks)

      const data = fileReader.result as ArrayBuffer
      const chunk = data.slice(offset, offset + chunkSize)
      offset += chunkSize

      // 处理分片数据
      spark.appendBinary(chunk)

      if (offset < file.size) {
        readNextChunk()
      } else {
        console.log('finished loading。computed hash is', color.cyan(spark.end())) // Compute hash
        spark.end()
        resolve(data)
      }
    }

    fileReader.onerror = function () {
      console.warn('oops, something went wrong.')
      reject('oops, something went wrong.')
    }

    function readNextChunk() {
      const slice = file.slice(offset, offset + chunkSize)
      fileReader.readAsArrayBuffer(slice)
    }

    readNextChunk()
  })
}

export function uploadFile(event: Event) {
  const files: FileList | null = (event.target as HTMLInputElement).files
  if (!files) return
}
