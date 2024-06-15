import { DomSource } from '@book-wise/web-highlight'
import { NoteAction, Toast } from '@renderer/components'
import { get, set, useClipboard } from '@vueuse/core'
import { Ref, ref, shallowReactive } from 'vue'
import { highlighter } from '../highlight'
import { ColorKeys, HighlightType, highlightColor } from '../highlight-color'

export class ToolbarStyle {
  static style = shallowReactive({ top: 0, left: 0 })
  static show = ref(false)
  static isEdite = ref(true)
  static source: DomSource[] = []

  static open(top: number, left: number, source: DomSource[], isEdite: boolean) {
    set(this.show, true)
    set(this.isEdite, isEdite)
    Object.assign(this.style, { top, left })
    this.source = source
  }

  static close() {
    set(this.show, false)
    Object.assign(this.style, { top: 0, left: 0 })
    this.source = []
  }
}

export class NoteBarStyle {
  static show = ref(false)
  static isPainted = true
  static source = ref<DomSource[]>([])

  static open(source: DomSource[], isPainted: boolean) {
    set(this.show, true)
    set(this.source, source)
    this.isPainted = isPainted
  }

  static close() {
    set(this.show, false)
    set(this.source, [])
  }
}

export class NoteToolBarAction {
  color = ref<ColorKeys>(highlightColor.color) // 颜色
  decoration = ref<string>('') // 类型：高亮 波浪线 直线

  constructor(
    public source: DomSource[],
    public isEdite: Ref<boolean>,
    public bookParam: Ref<string>
  ) {
    this.init()
  }

  updateSource(source: DomSource[]) {
    this.source = source
    this.init()
  }

  // 更改颜色
  changeColor(color: ColorKeys) {
    const source = this.source
    if (source.length === 0) return

    const { className } = source[0]
    if (className.includes(get(color))) return // 没有更改，无需继续操作

    set(this.color, color)

    // 但用户手动控制高亮工具栏的时候，存在直接输入笔记的情况，而此时并没有domSource节点数据，也就没有选中高亮类型
    if (get(this.decoration)) {
      // 更新笔记
      highlightColor.changeColor(color)
      this.updateNote()
    }
  }

  changeDecoration(decoration: HighlightType) {
    const source = this.source
    if (source.length === 0) return

    if (get(this.decoration) === decoration) return // 没有更改，无需继续操作

    highlightColor.changeType(decoration)
    set(this.decoration, decoration)

    // 更新笔记
    this.updateNote()
  }

  /**
   * 更新笔记
   */
  async updateNote() {
    const source = this.source
    if (source.length === 0) return

    // 更新domsource
    const { id, className } = source[0]
    const newClassName = `${get(this.decoration)}-${get(this.color)}`
    source.forEach((item) => (item.className = newClassName))

    if (get(this.isEdite)) {
      // 编辑
      highlighter.replaceClass(id, newClassName, className)
      NoteAction.updateBySourceId(id, { domSource: JSON.stringify(ToolbarStyle.source) })
    } else {
      // 新增
      highlighter.fromSource(ToolbarStyle.source)
      await NoteAction.add({
        sources: ToolbarStyle.source,
        eBookId: get(this.bookParam),
        chapterName: '',
        notes: ''
      })
      set(this.isEdite, true)
    }
    // 更新数据库的数据
    highlighter.setOption({ className: newClassName })
  }

  /**
   * 删除笔记
   * @returns
   */
  remove() {
    const source = this.source
    if (source.length === 0) return null

    const { id } = source[0]
    highlighter.remove(id)
    NoteAction.removeBySoureIds([id])
    return true
  }

  /**
   * 复制高亮内容
   */
  copySource() {
    const source = this.source
    if (source.length === 0) return null

    const { copy } = useClipboard()
    const val = source.reduce((acc, cur) => (acc += cur.text), '')
    copy(val)
    Toast({
      message: '已复制到剪贴板',
      position: ['toast-top', 'toast-center'],
      type: 'alert-success'
    })
    return true
  }

  /**
   * 马克笔
   */
  marker() {
    this.changeDecoration(HighlightType.marker)
  }

  /**
   * 直线
   */
  beeline() {
    this.changeDecoration(HighlightType.beeline)
  }

  /**
   * 波浪线
   */
  wavy() {
    this.changeDecoration(HighlightType.wavy)
  }

  private init() {
    const source = this.source
    if (source.length === 0) return

    const { className } = source[0]
    const [_textType, color] = className.split('-')

    // 文字标记类型
    let textType = ''
    if (_textType === HighlightType.marker) {
      textType = HighlightType.marker
    } else if (_textType === HighlightType.beeline) {
      textType = HighlightType.beeline
    } else if (_textType === HighlightType.wavy) {
      textType = HighlightType.wavy
    }

    if (!get(this.isEdite)) {
      textType = ''
    }

    set(this.decoration, textType)

    // 颜色
    if (color) {
      set(this.color, color)
    }
  }
}
