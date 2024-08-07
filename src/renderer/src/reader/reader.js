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
  let bookType = ''
  if (file.isDirectory) {
    const loader = await makeDirectoryLoader(file)
    book = await new EPUB(loader).init()
    bookType = 'epub'
  } else if (!file.size) throw new Error('File not found')
  else if (await isZip(file)) {
    const loader = await makeZipLoader(file)
    if (isCBZ(file)) {
      book = makeComicBook(loader, file)
      bookType = 'cbz'
    } else if (isFBZ(file)) {
      const { entries } = loader
      const entry = entries.find((entry) => entry.filename.endsWith('.fb2'))
      const blob = await loader.loadBlob((entry ?? entries[0]).filename)
      book = await makeFB2(blob)
      bookType = 'fb2'
    } else {
      book = await new EPUB(loader).init()
      bookType = 'epub'
    }
  } else if (await isPDF(file)) {
    const { makePDF } = await import('./pdf.js')
    book = await makePDF(file)
    bookType = 'pdf'
  } else {
    if (await isMOBI(file)) {
      book = await new MOBI({ unzlib: fflate.unzlibSync }).open(file)
      bookType = 'mobi'
    } else if (isFB2(file)) {
      book = await makeFB2(file)
      bookType = 'fb2'
    }
  }
  if (!book) throw new Error('File type not supported')

  return { book, bookType }
}

// 预估高度
const estimatedHeight = (node) => {
  node.classList.add('prose', 'prose-width', 'prose-hidden')
  document.body.appendChild(node)
  const height = window.getComputedStyle(node).height
  document.body.removeChild(node)
  return +height.replace('px', '')
}

export class Reader {
  blobs = new Map() // 保存图片 blob内容
  book
  bookType

  constructor() {
    this.#handleLinks.bind(this)
    this.#resolveCFI.bind(this)
    this.#handleRecIndexImg.bind(this)
  }

  /**
   * 打开文件渲染器
   * @param {*} file 文件内容
   * @param {*} isHandle 是否对章节额外处理，比如处理图片链接。如果只是读取文件信息，则不需要处理
   * @returns
   */
  open = async (file) => {
    const res = await getBook(file)
    this.book = res.book
    this.bookType = res.bookType
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
    const sections = this.book.sections || []
    if (this.bookType !== 'pdf') {
      if (sections.length) {
        const result = await Promise.all(
          sections.map(async (_, index) => {
            return this.handSection(index)
          })
        )
        return result
      } else {
        return []
      }
    } else {
      return sections
    }
  }

  handSection = async (index) => {
    const section = this.book.sections[index]
    const id = section.id
    const doc = await section.createDocument()
    const body = doc.querySelector('body')
    const height = estimatedHeight(body.cloneNode(true))
    this.#handleLinks(body, section)
    const html = body.innerHTML
      .replace(/xmlns=".*?"/g, '')
      .replace(/<([a-zA-Z0-9]+)(\s[^>]*)?>\s*<\/\1>/g, '') // 过滤掉空节点

    return { height, html, id }
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
      // if (typeof target.fraction === 'number') {
      //   const [index, anchor] = this.#sectionProgress.getSection(target.fraction)
      //   return { index, anchor }
      // }
      if (CFI.isCFI.test(target)) return this.resolveCFI(target)
      return this.book.resolveTocHref(target)
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
    console.log('cfi', cfi)
    if (this.book.resolveCFI) return this.book.resolveCFI(cfi)
    else {
      const parts = CFI.parse(cfi)
      console.log('parts', parts)
      const index = CFI.fake.toIndex((parts.parent ?? parts).shift())
      const anchor = (doc) => CFI.toRange(doc, parts)
      return { index, anchor }
    }
  }

  #replace(dom, section, attr) {
    const href_ = dom.getAttribute(attr)
    const href = section?.resolveHref?.(href_) ?? href_
    dom.setAttribute(attr, href)
    return href
  }

  /**
   * 处理书本链接
   */
  #handleLinks(dom, section) {
    const links = dom.querySelectorAll('a[href]')
    for (const item of links) {
      this.#replace(item, section, 'href')
    }
  }

  async #handleRecIndexImg(dom, section) {
    for (const img of dom.querySelectorAll('img[recindex]')) {
      const href = this.#replace(img, section, 'recindex')
      if (href) {
        const blob = await this.book?.loadBlob(href)
        if (blob) {
          this.blobs.set(href, blob)
        }
      }
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
