import { CreateFrom, EventTypeEnum, WebHighlight } from '@book-wise/web-highlight'
import { Book, db } from '@renderer/batabase'
import { $ } from '@renderer/shared'
import { highlightColor } from './highlight-color'
import { NoteAction } from './note'

export let highlighter: WebHighlight

export const CONTINAER_ID = 'reader-container'

export function initHighlight(book: Book) {
  highlighter = new WebHighlight({
    tagName: 'span',
    className: highlightColor.getSelectionClassName(),
    root: ($('#' + CONTINAER_ID) as HTMLElement) || Document,
    showError: true,
    auto: true
  })

  highlighter.on(EventTypeEnum.SOURCE, ({ isPainted, range, source, removeIds }) => {})

  // 创建高亮内容
  highlighter.on(EventTypeEnum.CREATE, async ({ id, sources, type, removeIds }) => {
    if (type === CreateFrom.rang) {
      // 删除重叠的笔记
      if (removeIds && removeIds.length > 0) {
        await db.notes.bulkDelete(removeIds)
      }

      // 新建笔记
      NoteAction.bulkAdd({ sources, eBookId: book.id, chapterName: '', notes: '' })
    }
  })

  highlighter.on(EventTypeEnum.CLICK, ({ id, target, source }) => {})
}
