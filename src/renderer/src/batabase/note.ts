export interface Note {
  id: string
  eBookId: string // 电子书id
  chapterIndex: number // 章节索引
  chapterName: string // 章节名
  bookText: string // 笔记对应的书本内容
  notes: string // 笔记
  createTime: number // 创建时间
  updateTime: number // 更新时间
  isDelete: number | null // 是否删除（记录删除时间）
  colorName: string // 高亮颜色名称
  // sourceId: string
  startDomMeta: string // 开始节点
  endDomMeta: string // 结束节点
}

export const schemaNote =
  '&id, eBookId, chapterIndex, chapterName, bookText, notes, domSource, createTime, updateTime, isDelete, colorName'
