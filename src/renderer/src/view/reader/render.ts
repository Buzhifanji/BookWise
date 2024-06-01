import { Reader } from '@book-wise/reader'
import { isElectron } from '@renderer/shared'

/**
 * 保存图片 blob内容
 */
export const blobStore = new Map<string, Blob>()

export let bookRender: any = null

/**
 * 渲染阅读器
 * @param reader
 */
export const render = async (data: ArrayBuffer) => {
  const reader = new Reader()
  bookRender = await reader.open(new File([data], ''))
  const toc = bookRender.toc || []

  const sections = await handleSection(bookRender.sections)

  return { sections, toc }
}

// 处理每章节内容
async function handleSection(sections: any[]) {
  const result: string[] = []
  for (const section of sections) {
    if (section.id.includes('page')) continue // 过滤掉封面
    const doc = await section.createDocument()
    const body = doc.querySelector('body')
    handleLinks(body, section)
    await handleImg(body, section)
    const html = body.innerHTML.replace(/xmlns=".*?"/g, '')
    result.push(html)
  }
  return result
}

/**
 * 处理书本链接
 */
function handleLinks(dom: HTMLElement, section: any) {
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
async function handleImg(dom: HTMLElement, section: any) {
  const imgs = dom.querySelectorAll('img[src]')
  try {
    for (const img of imgs) {
      const src = img.getAttribute('src')
      const href = section?.resolveHref?.(src) ?? src
      if (href) {
        if (bookRender.loadBlob) {
          // epub commic
          const blob = await bookRender.loadBlob(href)
          if (blob) {
            blobStore.set(href, blob)
            img.setAttribute('src', href)
          }
        } else if (bookRender.loadResourceBlob) {
          // mobi azw3
          const blob = await bookRender.loadResourceBlob(href)
          if (blob) {
            blobStore.set(href, blob)
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

type CB = (value: number) => void

// 目录跳转
export function bookCatalogJump(href: string, callback: CB) {
  if (!bookRender) return

  const data = bookRender.resolveHref(href)
  if (data && typeof data.index === 'number') {
    callback(data.index)
  }
}

// 点击书本链接
export function bookLinkClick(href: string, callback: CB) {
  if (!bookRender) return

  if (bookRender?.isExternal?.(href)) {
    // 外部链接，需要通知上层自行处理
    if (isElectron) {
      // todo 桌面外链
    } else {
      // 网页打开
      window.open(href, '_blank')
    }
  } else {
    bookCatalogJump(href, callback)
  }
}
