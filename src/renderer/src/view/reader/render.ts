import { Reader } from '@book-wise/reader'

/**
 * 渲染阅读器
 * @param reader
 */
export const render = async (data: ArrayBuffer) => {
  const reader = new Reader()
  const book = await reader.open(new File([data], ''))
  const toc = book.toc || []

  const sections = await handleSection(book.sections)

  console.log(book)
  return { book, sections, toc }
}

// 处理每章节内容
async function handleSection(sections: any[]) {
  const result: any[] = []
  for (const item of sections) {
    if (item.id.includes('page')) continue // 过滤掉封面
    const doc = await item.createDocument()
    const body = doc.querySelector('body')
    handleLinks(body)
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
