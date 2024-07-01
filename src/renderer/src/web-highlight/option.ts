import { Mode } from './mode'

export interface Options {
  context: Window // 上下文,默认是 window，但存在 iframe 的情况，此时需要重新设置 context
  root: HTMLElement | Document // 根节点，默认是 Document。用于处理 动态dom 场景。
  tagName: string // 渲染标签类型，默认 i 标签
  mode: Mode
  className: string // 渲染标签的样式。多个用空格隔空，例如： 'yellow blue'
  showError: boolean // 显示错误消息，默认为 false。如果为 true，则根据错误消息检查内容
  ignore: string[] // 忽略的标签列表，默认为空列表
  auto: boolean // 选中高亮是否里面绘制内容，默认是为true
  dynamic: boolean // 内容是否为动态，默认为 false
  pageAttribateName: string // 页面属性名，默认是 data-page-number
}

function getDefaultOption(): Options {
  return {
    context: window,
    root: document.body,
    tagName: 'i',
    mode: Mode.single,
    className: '',
    showError: false,
    ignore: [],
    auto: true,
    pageAttribateName: 'data-page-number',
    dynamic: false // 内容是否动态
  }
}

const _option = getDefaultOption()

export function setOption(option: Partial<Options>) {
  Object.assign(_option, option)
}

export function getOption() {
  return _option
}
