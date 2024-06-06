import { Reader } from '@book-wise/reader'
import { isElectron } from '@renderer/shared'

export let bookRender: Reader | null = null

/**
 * 渲染阅读器
 * @param reader
 */
export const render = async (data: ArrayBuffer) => {
  bookRender = new Reader()
  await bookRender.open(new File([data], ''))
  const sections = await bookRender.getSections()
  const toc = bookRender.book.toc || []
  console.log(bookRender)
  return { sections, toc }
}

/**
 * 目录跳转前 获取对应章节的索引
 * @param href
 * @returns
 */
export function getBookHref(href: string) {
  return bookRender?.resolveNavigation(href)
}

export function isExternal(href: string) {
  return bookRender!.isExternal(href)
}

export function getImgBlob(href: string) {
  return bookRender?.getImgBlob(href) || null
}

/**
 * 打开外部链接
 * @param href
 */
export function openExternal(href: string) {
  if (isElectron) {
    // todo 桌面外链
  } else {
    window.open(href, '_blank')
  }
}

export function unMountedBookRender() {
  bookRender?.destroy()
}
