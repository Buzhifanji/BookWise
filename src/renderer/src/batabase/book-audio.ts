export interface BookAudio {
  id: string
  bookId: string
  textHash: string // 文本id
  voice: string // 声音类型
  content: ArrayBuffer // 声音文件
}

export const schemaBookAudio = '&id, bookId, textHash, voice, content'
