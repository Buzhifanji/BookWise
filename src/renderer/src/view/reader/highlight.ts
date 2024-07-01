import { Book } from '@renderer/batabase'
import { NoteAction, NoteText } from '@renderer/components'
import { $, getNoteOffset } from '@renderer/shared'
import { settingStore } from '@renderer/store'
import { CreateFrom, EventTypeEnum, WebHighlight } from '@renderer/web-highlight'
import { get } from '@vueuse/core'
import { watchEffect } from 'vue'
import { highlightColor } from './highlight-color'
import { NoteBarStyle, ToolbarStyle } from './toolbar/action'

export let highlighter: WebHighlight

export const CONTINAER_ID = 'reader-container'

const getRoot = () => $('#' + CONTINAER_ID) as HTMLElement

export function initHighlight(book: Book) {
  highlighter = new WebHighlight({
    tagName: 'span',
    className: highlightColor.getClassName(),
    root: getRoot() || Document,
    showError: true,
    auto: settingStore.value.isAutoHighlight
  })

  watchEffect(() => {
    const auto = settingStore.value.isAutoHighlight
    highlighter?.setOption({ auto })
  })

  /**
   * 当 选中划词的时候，此时有range对象，会触发 EventTypeEnum.SOURCE 事件，应该展示 笔记工具操作栏。
   * 但同时也会触发 EventTypeEnum.CLICK 事件，会关闭 笔记工具操作栏。
   * 此时界面上应该显示 笔记工具栏，所以需要 isNotPaintedFromSource 来解决这个冲突的事件。
   */
  let isNotPaintedFromSource = false

  highlighter.on(EventTypeEnum.SOURCE, ({ isPainted, range, source }) => {
    if (!isPainted && !get(NoteBarStyle.show)) {
      // 手动控制绘制
      const { top, left } = getNoteOffset(range)
      ToolbarStyle.open(top, left, source, false)
      isNotPaintedFromSource = true
    }
  })

  // 创建高亮内容
  highlighter.on(EventTypeEnum.CREATE, async ({ sources, type, removeIds }) => {
    if (type === CreateFrom.rang) {
      let notes = ''
      if (removeIds && removeIds.length > 0) {
        // 取出将要删除笔记里的内容
        const willDeleteNote = await NoteAction.findBySourceIds(removeIds)
        const cacheNote: NoteText[] = []
        willDeleteNote.forEach((item) => {
          const val = NoteAction.getNoteText(item.notes)
          cacheNote.push(...val)
        })
        if (cacheNote.length > 0) {
          notes = JSON.stringify(cacheNote)
        }

        // 删除重叠的笔记
        await NoteAction.removeBySoureIds(removeIds)
      }

      // 新建笔记
      await NoteAction.add({ sources, eBookId: book.id, chapterName: '', notes, tag: '' })
    }
  })

  highlighter.on(EventTypeEnum.CLICK, ({ id, target, source }) => {
    if (id && source) {
      const { top, left } = getNoteOffset(target)
      ToolbarStyle.open(top, left, source, true)
    } else {
      if (!isNotPaintedFromSource) ToolbarStyle.close()
    }

    isNotPaintedFromSource = false
  })
}
