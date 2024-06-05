// import './view.js'
import { makeComicBook } from './comic-book.js'
import { EPUB } from './epub.js'
import * as CFI from './epubcfi.js'
import { makeFB2 } from './fb2.js'
import { isMOBI, MOBI } from './mobi.js'
import * as fflate from './vendor/fflate.js'

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

export class Reader {
  blobs = new Map() // 保存图片 blob内容
  book

  constructor() {
    this.#handleImg.bind(this)
    this.#handleLinks.bind(this)
    this.#resolveCFI.bind(this)
  }

  /**
   * 打开文件渲染器
   * @param {*} file 文件内容
   * @param {*} isHandle 是否对章节额外处理，比如处理图片链接。如果只是读取文件信息，则不需要处理
   * @returns
   */
  open = async (file) => {
    this.book = await getBook(file)
  }

  /**
   * 根据href 获取blob格式的图片内容
   * @param {*} href
   * @returns
   */
  getImgBlob = (href) => {
    let result = null
    if (href && this.blobs.has(href)) {
      result = this.blobs.get(href)
    }
    return result
  }

  /**
   * 获取元信息
   */
  getMetadata = () => {
    return this.book.metadata
  }

  /**
   * 获取封面
   * @returns
   */
  getCover = async () => {
    return await Promise.resolve(this.book.getCover?.())
  }

  getSections = async () => {
    const result = []
    for (const section of this.book.sections) {
      const id = section.id
      if (id && typeof id === 'string' && id.includes('page')) continue // 过滤掉封面

      const doc = await section.createDocument()
      const body = doc.querySelector('body')
      this.#handleLinks(body, section)
      await this.#handleImg(body, section)
      const html = body.innerHTML.replace(/xmlns=".*?"/g, '')
      result.push(html)
    }

    return result
  }

  /**
   * 判断书本内容里的链接是否是外部链接
   * @param {*} href
   * @returns
   */
  isExternal = (href) => {
    return this.book.isExternal?.(href)
  }

  resolveNavigation = (target) => {
    try {
      if (typeof target === 'number') return { index: target }
      if (CFI.isCFI.test(target)) return this.resolveCFI(target)
      return this.book.resolveHref(target)
    } catch (e) {
      console.error(e)
      console.error(`Could not resolve target ${target}`)
    }
  }

  destroy = () => {
    this.book.destroy()
    this.blobs.clear()
  }

  #resolveCFI(cfi) {
    if (this.book.resolveCFI) return this.book.resolveCFI(cfi)
    else {
      const parts = CFI.parse(cfi)
      const index = CFI.fake.toIndex((parts.parent ?? parts).shift())
      const anchor = (doc) => CFI.toRange(doc, parts)
      return { index, anchor }
    }
  }

  /**
   * 处理书本链接
   */
  #handleLinks(dom, section) {
    const links = dom.querySelectorAll('a[href]')
    for (const item of links) {
      const href_ = item.getAttribute('href')
      const href = section?.resolveHref?.(href_) ?? href_
      item.setAttribute('href', href)
    }
  }

  /**
   * 处理图片
   * @param dom
   * @param section
   */
  async #handleImg(dom, section) {
    const imgs = dom.querySelectorAll('img[src]')
    try {
      for (const img of imgs) {
        const src = img.getAttribute('src')
        const href = section?.resolveHref?.(src) ?? src
        if (href) {
          if (this.book.loadBlob) {
            // epub commic
            const blob = await this.book.loadBlob(href)
            if (blob) {
              this.blobs.set(href, blob)
              img.setAttribute('src', href)
            }
          } else if (this.book.loadResourceBlob) {
            // mobi azw3
            const blob = await this.book.loadResourceBlob(href)
            if (blob) {
              this.blobs.set(href, blob)
              img.setAttribute('src', href)
            }
          } else {
            console.log('todo handle imgae resource')
          }
        }
      }
    } catch (e) {
      console.error('handle img to bloe error: ', e)
    }
  }

  /**
   * 获取字符串形式的作者
   * @param {*} author
   * @returns
   */
  static handleAuthor = (author) => {
    return typeof author === 'string'
      ? author
      : author?.map((author) => (typeof author === 'string' ? author : author.name))?.join(', ') ??
          ''
  }

  /**
   * 获取字符串形式的语言
   * @param {*} language
   * @returns
   */
  static handleLanguage = (language) => {
    return typeof language === 'string' ? language : language?.join(', ') ?? ''
  }
}
