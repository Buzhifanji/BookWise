import Dexie, { type EntityTable } from 'dexie'
import { Book, schemaBook } from './book'
import { BookContent, schemaBookContent } from './book-content'
import { Note, schemaNote } from './note'
import { ReadTime, schemeReadTime } from './read-time'

const db = new Dexie('__BookWiseDatabase__') as Dexie & {
  books: EntityTable<Book, 'id'>
  bookContents: EntityTable<BookContent, 'bookId'>
  notes: EntityTable<Note, 'id'>
  readTime: EntityTable<ReadTime, 'id'>
}

const version = 1

db.version(version).stores({
  books: schemaBook, //
  bookContents: schemaBookContent, // 书本内容
  notes: schemaNote, // 笔记
  readTime: schemeReadTime // 阅读时间
})

export const clearDB = () => {
  db.books.clear()
  db.bookContents.clear()
  db.notes.clear()
  db.readTime.clear()
}

export { db }
export type { Book, BookContent, Note }
