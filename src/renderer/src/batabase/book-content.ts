export interface BookContent {
  bookId: string
  content: Uint8Array
}

export const schemaBookContent = '&bookId, content'
