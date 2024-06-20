export interface ReadTime {
  id: string
  eBookId: string // 电子书id
  creatTime: number // 创建时间
  startTime: number // 开始阅读时间
  endTime: number // 结束阅读时间
}

export const schemeReadTime = '&id, eBookId,creatTime,startTime,endTime'
