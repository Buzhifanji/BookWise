// import './view.js'
import { makeComicBook } from './comic-book.js'
import { EPUB } from './epub.js'
import { makeFB2 } from './fb2.js'
import { isMOBI, MOBI } from './mobi.js'
import fflate from './vendor/fflate.js'

const isZip = async (file) => {
  const arr = new Uint8Array(await file.slice(0, 4).arrayBuffer())
  return arr[0] === 0x50 && arr[1] === 0x4b && arr[2] === 0x03 && arr[3] === 0x04
}

const isPDF = async (file) => {
  const arr = new Uint8Array(await file.slice(0, 5).arrayBuffer())
  return arr[0] === 0x25 && arr[1] === 0x50 && arr[2] === 0x44 && arr[3] === 0x46 && arr[4] === 0x2d
}

const makeZipLoader = async (file) => {
  const { configure, ZipReader, BlobReader, TextWriter, BlobWriter } = await import(
    './vendor/zip.js'
  )
  configure({ useWebWorkers: false })
  const reader = new ZipReader(new BlobReader(file))
  const entries = await reader.getEntries()
  const map = new Map(entries.map((entry) => [entry.filename, entry]))
  const load =
    (f) =>
    (name, ...args) =>
      map.has(name) ? f(map.get(name), ...args) : null
  const loadText = load((entry) => entry.getData(new TextWriter()))
  const loadBlob = load((entry, type) => entry.getData(new BlobWriter(type)))
  const getSize = (name) => map.get(name)?.uncompressedSize ?? 0
  return { entries, loadText, loadBlob, getSize }
}

const getFileEntries = async (entry) =>
  entry.isFile
    ? entry
    : (
        await Promise.all(
          Array.from(
            await new Promise((resolve, reject) =>
              entry.createReader().readEntries(
                (entries) => resolve(entries),
                (error) => reject(error)
              )
            ),
            getFileEntries
          )
        )
      ).flat()

const makeDirectoryLoader = async (entry) => {
  const entries = await getFileEntries(entry)
  const files = await Promise.all(
    entries.map(
      (entry) =>
        new Promise((resolve, reject) =>
          entry.file(
            (file) => resolve([file, entry.fullPath]),
            (error) => reject(error)
          )
        )
    )
  )
  const map = new Map(files.map(([file, path]) => [path.replace(entry.fullPath + '/', ''), file]))
  const decoder = new TextDecoder()
  const decode = (x) => (x ? decoder.decode(x) : null)
  const getBuffer = (name) => map.get(name)?.arrayBuffer() ?? null
  const loadText = async (name) => decode(await getBuffer(name))
  const loadBlob = (name) => map.get(name)
  const getSize = (name) => map.get(name)?.size ?? 0
  return { loadText, loadBlob, getSize }
}

const isCBZ = ({ name, type }) => type === 'application/vnd.comicbook+zip' || name.endsWith('.cbz')

const isFB2 = ({ name, type }) => type === 'application/x-fictionbook+xml' || name.endsWith('.fb2')

const isFBZ = ({ name, type }) =>
  type === 'application/x-zip-compressed-fb2' || name.endsWith('.fb2.zip') || name.endsWith('.fbz')

const getBook = async (file) => {
  let book
  if (file.isDirectory) {
    const loader = await makeDirectoryLoader(file)
    book = await new EPUB(loader).init()
  } else if (!file.size) throw new Error('File not found')
  else if (await isZip(file)) {
    const loader = await makeZipLoader(file)
    if (isCBZ(file)) {
      book = makeComicBook(loader, file)
    } else if (isFBZ(file)) {
      const { entries } = loader
      const entry = entries.find((entry) => entry.filename.endsWith('.fb2'))
      const blob = await loader.loadBlob((entry ?? entries[0]).filename)
      book = await makeFB2(blob)
    } else {
      book = await new EPUB(loader).init()
    }
  } else if (await isPDF(file)) {
    // todo 待处理
    // const { makePDF } = await import('./pdf.js')
    // book = await makePDF(file)
  } else {
    if (await isMOBI(file)) {
      book = await new MOBI({ unzlib: fflate.unzlibSync }).open(file)
    } else if (isFB2(file)) {
      book = await makeFB2(file)
    }
  }
  if (!book) throw new Error('File type not supported')

  return book
}

let tocId = 0
const handleToc = (toc) => {
  toc.forEach((item) => {
    const subitems = item.subitems

    tocId += 1
    item.tocId = tocId.toString()

    if (Array.isArray(subitems)) {
      handleToc(subitems)
    }
  })
}

export class Reader {
  #tocView
  style = {
    spacing: 1.4,
    justify: true,
    hyphenate: true
  }
  annotations = new Map()
  annotationsByValue = new Map()

  book

  constructor() {}
  async open(file) {
    this.book = await getBook(file)

    console.log('book: ', this.book)
  }

  /**
   * 获取目录
   * @returns
   */
  getToc() {
    // 处理一次即可
    const toc = this.book.toc
    if (!toc[0]?.tocId) {
      if (Array.isArray(toc)) {
        handleToc(toc)
      }
    }
    return Array.isArray(toc) ? toc : []
  }

  goTo(href) {
    // this.render.goTo(href)
  }

  /**
   * 获取元信息
   */
  getMetadata() {
    return this.book.metadata
  }

  destroy() {
    this.book.destroy()
  }
}
