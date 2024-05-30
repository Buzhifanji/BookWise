import Dexie, { type EntityTable } from 'dexie'
import { Book, schemaBook } from './book'
import { BookContent, schemaBookContent } from './book-content'

const db = new Dexie('__BookWiseDatabase__') as Dexie & {
  books: EntityTable<Book, 'id'>
  bookContents: EntityTable<BookContent, 'id'>
}

const version = 1

db.version(version).stores({
  books: schemaBook,
  bookContents: schemaBookContent // 书本内容
})

export { db }
export type { Book, BookContent }
