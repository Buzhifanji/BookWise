import { Reader } from '@book-wise/reader'

/**
 * 保存图片 blob内容
 */
export const blobStore = new Map<string, Blob>()

/**
 * 渲染阅读器
 * @param reader
 */
export const render = async (data: ArrayBuffer) => {
  const reader = new Reader()
  const bookReader = await reader.open(new File([data], ''))
  const toc = bookReader.toc || []

  const sections = await handleSection(bookReader.sections, bookReader)

  console.log(bookReader)
  return { bookReader, sections, toc }
}

// 处理每章节内容
async function handleSection(sections: any[], bookReader: any) {
  const result: string[] = []
  for (const section of sections) {
    if (section.id.includes('page')) continue // 过滤掉封面
    const doc = await section.createDocument()
    const body = doc.querySelector('body')
    handleLinks(body)
    await handleImg(body, section, bookReader)
    result.push(body.innerHTML)
  }
  return result
}

/**
 * 处理书本链接
 * 由于书本内容是按需加载的，而加载的内容是通过v-html绑定dom的，v-html这种方式不能绑定事件
 * 因此，目前处理比较粗暴，禁止所有链接
 */
function handleLinks(dom: HTMLElement) {
  const links = dom.querySelectorAll('a[href]')
  for (const item of links) {
    item.setAttribute('href', 'javascript:void(0)')
  }
}

async function handleImg(dom: HTMLElement, section: any, bookReader: any) {
  const imgs = dom.querySelectorAll('img[src]')
  try {
    for (const img of imgs) {
      const src = img.getAttribute('src')
      const href = section?.resolveHref?.(src) ?? src
      if (href) {
        if (bookReader.loadBlob) {
          // epub commic
          const blob = await bookReader.loadBlob(href)
          if (blob) {
            blobStore.set(href, blob)
            img.setAttribute('src', href)
          }
        } else if (bookReader.loadResourceBlob) {
          // mobi azw3
          const blob = await bookReader.loadResourceBlob(href)
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
