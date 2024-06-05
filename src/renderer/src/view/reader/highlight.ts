import { CreateFrom, EventTypeEnum, WebHighlight } from '@book-wise/web-highlight'
import { Book, db } from '@renderer/batabase'
import { highlightColor } from './highlight-color'

// todo bug 合并高亮内容存在bug
export let highlighter: WebHighlight

export function initHighlight(book: Book) {
  highlighter = new WebHighlight({
    tagName: 'span',
    className: highlightColor.getSelectionClassName(),
    showError: true,
    auto: true
  })

  highlighter.on(EventTypeEnum.SOURCE, ({ isPainted, range, source, removeIds }) => {})

  // 创建高亮笔记
  highlighter.on(EventTypeEnum.CREATE, ({ id, sources, type, removeIds }) => {
    if (type === CreateFrom.rang) {
      // 删除重叠的笔记
      if (removeIds && removeIds.length > 0) {
        db.notes.bulkDelete(removeIds)
      }

      // 新建笔记
      // NoteAction.create({ sources, eBookId: book.id })
    }
    console.log('sources', sources)
  })

  highlighter.on(EventTypeEnum.CLICK, ({ id, target, source }) => {})
}
