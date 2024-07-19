import Dexie, { type EntityTable } from 'dexie'
import { Book, schemaBook } from './book'
import { BookAudio, schemaBookAudio } from './book-audio'
import { BookContent, schemaBookContent } from './book-content'
import { BookCover, schemaBookCover } from './book.cover'
import { Bookshelf, schemaBookshelf } from './bookshelf'
import { Note, schemaNote } from './note'
import { ReadTime, schemeReadTime } from './read-time'
import { Tag, schemaTag } from './tag'

const db = new Dexie('__BookWiseDatabase__') as Dexie & {
  books: EntityTable<Book, 'id'>
  bookContents: EntityTable<BookContent, 'bookId'>
  notes: EntityTable<Note, 'id'>
  readTime: EntityTable<ReadTime, 'id'>
  tag: EntityTable<Tag, 'id'>
  bookshelf: EntityTable<Bookshelf, 'id'>
  bookAudio: EntityTable<BookAudio, 'id'>
  bookCover: EntityTable<BookCover, 'bookId'>
}

db.version(2).stores({
  books: schemaBook, //
  bookContents: schemaBookContent, // 书本内容
  notes: schemaNote, // 笔记
  readTime: schemeReadTime, // 阅读时间
  tag: schemaTag, // 标签
  bookshelf: schemaBookshelf, // 书架
  bookAudio: schemaBookAudio, // 音频
  bookCover: schemaBookCover // 书籍封面
})

// db.version(3)
//   .stores({
//     books: schemaBookId2, //
//     bookContents: schemaBookContent, // 书本内容
//     notes: schemaNote, // 笔记
//     readTime: schemeReadTime, // 阅读时间
//     tag: schemaTag, // 标签
//     bookshelf: schemaBookshelf // 书架
//   })
//   .upgrade((transaction) => {
//     transaction
//       .table('books')
//       .toCollection()
//       .modify((item) => {
//         item.isReadDone = false
//         item.format = ''
//       })
//   })

export const clearDB = () => {
  db.books.clear()
  db.bookContents.clear()
  db.notes.clear()
  db.readTime.clear()
  db.tag.clear()
  db.bookshelf.clear()
  db.bookAudio.clear()
  db.bookCover.clear()
}

export { db }
export type { Book, BookAudio, BookContent, BookCover, Bookshelf, Note, Tag }
