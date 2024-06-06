import { CreateFrom, EventTypeEnum, WebHighlight } from '@book-wise/web-highlight'
import { db } from '@renderer/batabase'
import { $ } from '@renderer/shared'
import { highlightColor } from './highlight-color'

export let highlighter: WebHighlight

export const CONTINAER_ID = 'reader-container'

export function initHighlight() {
  highlighter = new WebHighlight({
    tagName: 'span',
    className: highlightColor.getSelectionClassName(),
    root: ($('#' + CONTINAER_ID) as HTMLElement) || Document,
    showError: true,
    auto: true
  })

  highlighter.on(EventTypeEnum.SOURCE, ({ isPainted, range, source, removeIds }) => {})

  // 创建高亮笔记
  highlighter.on(EventTypeEnum.CREATE, async ({ id, sources, type, removeIds }) => {
    if (type === CreateFrom.rang) {
      // 删除重叠的笔记
      if (removeIds && removeIds.length > 0) {
        await db.notes.bulkDelete(removeIds)
      }

      // 新建笔记
      // NoteAction.create({ sources, eBookId: book.id })
    }
    console.log('sources', sources)
  })

  highlighter.on(EventTypeEnum.CLICK, ({ id, target, source }) => {})
}
