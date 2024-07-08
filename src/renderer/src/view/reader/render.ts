import { Reader } from '@renderer/reader'
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
  handleToc(toc)

  const _isPDG = bookRender.book.type === 'pdf'

  set(DPFUtil.isPDF, _isPDG)

  return { sections, toc }
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
    item.page = bookRender!.resolveNavigation(item.href).index
  })

  for (let i = 0; i < list.length; i++) {
    const currunt = list[i]
    const next = list[i + 1]
    if (next) {
      currunt.nextPage = next.page
    } else {
      currunt.nextPage = currunt.page * 2
    }
  }
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

export function unMountedBookRender() {
  bookRender?.destroy()
}
