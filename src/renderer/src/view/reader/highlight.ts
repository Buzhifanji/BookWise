import { EventTypeEnum, HMode, WebHighlight } from '@book-wise/web-highlight'
import { getTextColor } from './highlight-color'

// todo bug 合并高亮内容存在bug
export let webHighlight: WebHighlight

export function initWebHighlight() {
  webHighlight = new WebHighlight({
    className: getTextColor(),
    showError: true,
    auto: true,
    mode: HMode.single
  })

  webHighlight.on(EventTypeEnum.SOURCE, ({ isPainted, range, source, removeIds }) => {})

  // 创建高亮笔记
  webHighlight.on(EventTypeEnum.CREATE, ({ sources, type, removeIds }) => {
    console.log('sources', sources)
  })

  webHighlight.on(EventTypeEnum.CLICK, ({ id, target, source }) => {})
}
