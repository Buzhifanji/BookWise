import { Reader } from '@book-wise/reader'

/**
 * 渲染阅读器
 * @param reader
 */
export const render = async (data: ArrayBuffer) => {
  const reader = new Reader()
  const book = await reader.open(new File([data], ''))
  const sections = book.sections
  const toc = book.toc || []
  await handleSection(sections)

  console.log(book)
  return { book, sections, toc }
}

async function handleSection(sections: any[]) {
  for (const item of sections) {
    const doc = await item.createDocument()
    const body = doc.querySelector('body')
    item.doc = body.innerHTML
  }
}
