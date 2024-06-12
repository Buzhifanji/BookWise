import { CreateFrom, EventTypeEnum, WebHighlight } from '@book-wise/web-highlight'
import { Book } from '@renderer/batabase'
import { $, getNoteOffset } from '@renderer/shared'
import { highlightColor } from './highlight-color'
import { NoteAction } from './note'
import { ToolbarAction } from './toolbar/action'

export let highlighter: WebHighlight

export const CONTINAER_ID = 'reader-container'

const getRoot = () => $('#' + CONTINAER_ID) as HTMLElement

export function initHighlight(book: Book) {
  highlighter = new WebHighlight({
    tagName: 'span',
    className: highlightColor.getSelectionClassName(),
    root: getRoot() || Document,
    showError: true,
    auto: true
  })

  highlighter.on(EventTypeEnum.SOURCE, ({ isPainted, range, source, removeIds }) => {})

  // 创建高亮内容
  highlighter.on(EventTypeEnum.CREATE, async ({ sources, type, removeIds }) => {
    if (type === CreateFrom.rang) {
      // 删除重叠的笔记
      if (removeIds && removeIds.length > 0) {
        await NoteAction.removeBySoureIds(removeIds)
      }

      // 新建笔记
      await NoteAction.bulkAdd({ sources, eBookId: book.id, chapterName: '', notes: '' })
    }
  })

  highlighter.on(EventTypeEnum.CLICK, ({ id, target, source }) => {
    if (id && source) {
      const { top, left } = getNoteOffset(target, getRoot())
      ToolbarAction.open(top, left, source)
    } else {
      ToolbarAction.close()
    }
  })
}
