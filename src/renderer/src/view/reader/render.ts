import { Reader } from '@book-wise/reader'
import { isElectron } from '@renderer/shared'

/**
 * 保存图片 blob内容
 */
export const blobStore = new Map<string, Blob>()

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
