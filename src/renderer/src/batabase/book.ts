export interface Book {
  id: string
  name: string // 书名
  author: string // 作者
  cover: Uint8Array // 封面
  description: string // 描述
  category: number // 分类
  status: number // 状态
  size: number // 文件大小
  pages: number // 页数
  path: string // 文件路径
  language: string // 语言
  publisher: string // 出版商
  publishTime: string // 出版时间
  createTime: number // 创建时间
  updateTime: number // 更新时间
  isDelete: number | null // 是否删除（记录删除时间）
  md5: string // 文件md5
  count: number // 打开次数
  lastReadPosition: string // 最后一次阅读位置
  score: number // 评分
  progress: number // 进度
  groupId: string // 分组
  groupName: string
  isReadDone: boolean // 是否阅读完毕
  format: string // 书籍格式
  isLove: boolean // 是否收藏
}

export const schemaBook =
  '&id, name, author, cover, description, category, size, pages, path, language, publisher, publishTime, createTime, updateTime, isDelete, &md5, count, lastReadPosition,score,progress,group'

export const schemaBookId2 = schemaBook + ',isReadDone,format,isLove'
