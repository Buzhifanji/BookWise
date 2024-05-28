import SparkMD5 from 'spark-md5'

const chunkSize = 1024 * 1024 * 10 // 每个分片的大小，以每片10MB大小来逐次读取;

/**
 * 读取单个文件
 * @param file
 */
export function readFile(file: File): Promise<{ data: ArrayBuffer; hash: string }> {
  return new Promise((resolve, reject) => {
    let offset = 0
    const spark = new SparkMD5.ArrayBuffer() //创建SparkMD5的实例
    const fileReader = new FileReader()

    fileReader.onload = function () {
      const data = fileReader.result as ArrayBuffer
      const chunk = data.slice(offset, offset + chunkSize)
      offset += chunkSize

      // 处理分片数据
      spark.append(chunk)

      if (offset < file.size) {
        readNextChunk()
      } else {
        const hash = spark.end()
        console.log('finished loading。computed hash is: ', hash)
        resolve({ data, hash })
      }
    }

    fileReader.onerror = function () {
      console.warn('oops, something went wrong.')
      reject(`the ${File.name} file read error `)
    }

    function readNextChunk() {
      const slice = file.slice(offset, offset + chunkSize)
      fileReader.readAsArrayBuffer(slice)
    }

    readNextChunk()
  })
}

export async function readFiles(files: File[]) {
  return await Promise.all(files.map(readFile))
}
