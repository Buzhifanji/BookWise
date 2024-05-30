export interface BookContent {
  id: number
  bookId: string
  content: Uint8Array
}

export const schemaBookContent = '++id, bookId, content'
