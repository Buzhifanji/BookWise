export interface BookContent {
  id: string
  bookId: string
  content: Uint8Array
}

export const schemaBookContent = '&id, &bookId, content'
