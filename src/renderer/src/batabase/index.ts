import Dexie, { type EntityTable } from 'dexie'
import { Book, schemaBook } from './book'
import { BookContent, schemaBookContent } from './book-content'
import { Note, schemaNote } from './note'

const db = new Dexie('__BookWiseDatabase__') as Dexie & {
  books: EntityTable<Book, 'id'>
  bookContents: EntityTable<BookContent, 'bookId'>
  notes: EntityTable<Note, 'id'>
}

console.log(db)

const version = 1

db.version(version).stores({
  books: schemaBook, //
  bookContents: schemaBookContent, // 书本内容
  notes: schemaNote // 笔记
})

export { db }
export type { Book, BookContent, Note }
