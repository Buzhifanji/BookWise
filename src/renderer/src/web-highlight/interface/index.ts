export type Doc = HTMLElement | Document

export type Context = Document | Window

export interface DomMeta {
  tagName: string // 标签
  index: number // 标签索引值
  offset: number // 文本的偏移量
}

/**
 * 如果startIndex数值与endIndex不相等，说明该条划线是跨段落的划线
 *
 * 标签 + 标签索引值，用于定位 段落
 */
export interface DomSource {
  startDomMeta: DomMeta // 划线的起始段落
  endDomMeta: DomMeta // 划线的结束段落
  className: string // 节点 className
  tagName: string // 节点 包裹标签类型 默认 i
  id: string //
  text: string // 选中的文本内容
  page: string // 页面信息，动态内容需要
}
