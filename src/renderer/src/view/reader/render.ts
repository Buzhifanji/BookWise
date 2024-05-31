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

async function handleSection(sections: any[]) {
  const result: any[] = []
  for (const item of sections) {
    if (item.id.includes('page')) continue // 过滤掉封面
    const doc = await item.createDocument()
    const body = doc.querySelector('body')
    result.push(body.innerHTML)
  }
  return result
}
