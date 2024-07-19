export interface BookCover {
  bookId: string
  cover: Uint8Array
}

export const schemaBookCover = '&bookId, cover'
