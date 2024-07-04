export interface Note {
  id: string
  eBookId: string // 电子书id
  eBookName: string // 电子书名
  chapterName: string // 章节名
  notes: string // 笔记
  createTime: number // 创建时间
  updateTime: number // 更新时间
  isDelete: number | null // 是否删除（记录删除时间）
  sourceId: string // source id
  domSource: string // 节点数据（json)
  tag: string // 标签 (json)
}

export const schemaNote =
  '&id, eBookId,sourceId, chapterIndex, chapterName, bookText, notes, domSource, createTime, updateTime, isDelete, colorName, tag,eBookName'
