import { Reader } from '@book-wise/reader'
import { isElectron } from '@renderer/shared'
import { set } from '@vueuse/core'
import { ref, shallowReactive } from 'vue'

export let bookRender: Reader | null = null

// pdf 相关数据
export class DPFUtil {
  static isPDF = ref(false)
  static size = shallowReactive({ width: 0, height: 0 })
  static total = ref(0)
  static sections: any[] = []
}

/**
 * 渲染阅读器
 * @param reader
 */
export const render = async (file: File) => {
  bookRender = new Reader()
  await bookRender.open(file)
  const sections = await bookRender.getSections()

  const toc = bookRender.book.toc || []
  const _isPDG = bookRender.book.type === 'pdf'

  set(DPFUtil.isPDF, _isPDG)

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
