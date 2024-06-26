export interface Tag {
  id: string
  createTime: number // 创建时间
  updateTime: number // 更新时间
  isDelete: number | null // 是否删除（记录删除时间）
  tagName: string
}

export const schemaTag = '&id, createTime,updateTime,isDelete,tagName'
