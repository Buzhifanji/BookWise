import { Book } from '@renderer/batabase'
import { BookAction, BookContentAction } from '@renderer/components'
import { Reader } from '@renderer/reader'
import {
  arrayBufferToFile,
  isElectron,
  isNumber,
  StorageAction,
  tocTreeToArray
} from '@renderer/shared'
import { PDF } from '@renderer/view/reader/pdf/pdf'
import { ref, toRaw } from 'vue'
import { bookLoadedSetionBus } from './use-event-bus'

const KEY = 'book-wise_open_book'

let bookRender: Reader | null = null // 书籍渲染器

const bookJumpStore = new StorageAction(KEY, localStorage)
const bookRefreshStore = new StorageAction(KEY, sessionStorage)

export function beforeOpenBook(val: Book) {
  if (!val) return
  const data = bookJumpStore.get()
  data[val.id] = { ...val, cover: '' }
  bookJumpStore.set(data)
}

export function cahceRefreshBook(val: Book) {
  const res = { ...toRaw(val), cover: '' }
  bookRefreshStore.set(res)
}

async function getBookInfo(id: string) {
  const val = bookJumpStore.get()?.[id] || bookRefreshStore.get()
  if (!val) {
    return await BookAction.fineOne(id)
  }

  return val
}

// 获取书本内容
async function getBookContent(bookId: string, url: string) {
  try {
    if (isElectron) {
      const content = await window.api.readFile(url)
      return { content, bookId }
    } else {
      // 网页从数据库中获取
      return BookContentAction.findOne(bookId)
    }
  } catch (err) {
    return null
  }
}

export async function renderBook(id: string) {
  const bookInfo = await getBookInfo(id)
  bookJumpStore.clear()
  if (!bookInfo) return null

  const bookContent = await getBookContent(id, bookInfo.path)
  if (!bookContent) return null

  const file = arrayBufferToFile(bookContent.content, bookInfo.name)

  BookRender.bookInfo.value = bookInfo

  bookRender = new Reader()
  await bookRender.open(file)
  // console.log('bookRender', bookRender)
  if (bookRender.bookType === 'pdf') {
    const outline = await PDF.getOutline()
    BookRender.bookToc.value = outline
  } else {
    const toc = bookRender.book.toc || []
    handleToc(toc)
    BookRender.isInOneCatalog = sureBookCatalog(toc)
    BookRender.bookArrayToc.length = 0
    BookRender.bookArrayToc.push(...tocTreeToArray(toc))

    BookRender.sectionNum = bookRender.book.sections?.length || 0
    BookRender.bookToc.value = toc
  }

  return { bookContent }
}

function handleToc(toc: any[]) {
  const list: any = []
  const eachToc = (data: any[]) => {
    data.forEach((item) => {
      list.push(item)
      if (Array.isArray(item.subitems)) {
        eachToc(item.subitems)
      }
    })
  }
  eachToc(toc)

  list.forEach((item: any) => {
    item.page = BookRender.getBookHref(item.href)!.index
  })
}

function sureBookCatalog(toc: any[]) {
  let result = false
  for (const item of toc) {
    const page = item.page
    if (Array.isArray(item.subitems)) {
      for (const subItem of item.subitems) {
        if (isNumber(subItem.page)) {
          if (subItem.page === page) {
            result = true
            break
          } else {
            result = false
            break
          }
        }
      }
    }
  }
  return result
}

export class BookRender {
  static bookInfo = ref<Book>() // 书籍信息

  static sectionNum = ref(0) // 章节数量
  static section: any[] = [] // 处理后的章节内容

  static bookToc = ref<any[]>([]) // 目录
  static bookArrayToc: any[] = [] // 数组目录
  static isInOneCatalog = false // 子目录内容是否在同一目录下

  static getBook() {
    return bookRender
  }

  // 处理每一章节，滚动模式需要获取高度
  static async handleBookSection() {
    if (bookRender) {
      const res = await bookRender.getSections()
      this.section.length = 0
      this.section.push(...res)
      bookLoadedSetionBus.emit('loaded', true)
    }
    return []
  }

  static async getSection(index: number) {
    const res = this.section[index]
    if (res) {
      return res
    } else {
      return await bookRender!.handSection(index)
    }
  }

  static getBookHref(href: string) {
    return bookRender?.resolveNavigation(href)
  }

  static getBookType() {
    return bookRender?.bookType || ''
  }

  static async openExternal(href: string) {
    if (isElectron) {
      // todo 桌面外链
    } else {
      window.open(href, '_blank')
    }
  }

  static isExternal(href: string) {
    return bookRender!.isExternal(href)
  }

  static clear() {
    bookRender?.destroy()
  }
}
