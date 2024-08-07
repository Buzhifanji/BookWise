import { Book, BookContent, BookCover, db } from '@renderer/batabase'
import { ReadTime } from '@renderer/batabase/read-time'
import { t } from '@renderer/data'
import { now, toastError } from '@renderer/shared'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { v4 as uuidv4 } from 'uuid'

/**
 * 图书操作
 */
export class BookAction {
  static bulkAdd(book: Book[]) {
    try {
      return db.books.bulkAdd(book)
    } catch (error) {
      toastError(t('book.importBookFail') + error)
      return Promise.reject(error)
    }
  }

  static removeOne(id: string, isForce: boolean) {
    try {
      if (isForce) {
        return db.books.delete(id)
      } else {
        return db.books.update(id, { isDelete: now() })
      }
    } catch (error) {
      toastError('common.removeFail' + error)
      return Promise.reject(error)
    }
  }

  static update(id: string, value: Partial<Book>) {
    try {
      return db.books.update(id, { ...value, updateTime: now() })
    } catch (error) {
      toastError(t('common.editFail') + error)
      return Promise.reject(error)
    }
  }

  static restoreOne(id: string) {
    try {
      return db.books.update(id, { isDelete: null })
    } catch (error) {
      toastError(t('common.restoreFail') + error)
      return Promise.reject(error)
    }
  }

  static fineOne(id: string) {
    try {
      return db.books.get(id)
    } catch (error) {
      toastError(t('book.getBookFail') + error)
      return Promise.reject(error)
    }
  }
  static getAll() {
    try {
      return db.books.toArray()
    } catch (error) {
      toastError(t('book.getBookListFail') + error)
      return Promise.reject(error)
    }
  }

  static observable() {
    try {
      return useObservable<Book[], Book[]>(liveQuery(async () => await db.books.toArray()) as any)
    } catch (error) {
      toastError(t('book.getBookListFail') + error)
      return [] as Book[]
    }
  }
}

/**
 * 书籍内容
 */
export class BookContentAction {
  static bulkAdd(bookContentList: BookContent[]) {
    try {
      return db.bookContents.bulkPut(bookContentList)
    } catch (error) {
      toastError(t('book.importBookFail') + error)
      return Promise.reject(error)
    }
  }

  static async findOne(bookId: string) {
    return await db.bookContents.where('bookId').equals(bookId).first()
  }
}

export class BookReadTimeAction {
  static add(value: { eBookId: string; startTime: number; endTime: number }) {
    try {
      const time: ReadTime = {
        id: uuidv4(),
        ...value,
        creatTime: now()
      }
      return db.readTime.put(time)
    } catch (error) {
      toastError(t('book.recordBookTimeFail') + error)
      return Promise.reject(error)
    }
  }

  static async getAll() {
    return db.readTime.toArray()
  }

  static observable() {
    try {
      return useObservable<Book[], Book[]>(
        liveQuery(async () => await db.readTime.toArray()) as any
      )
    } catch (error) {
      toastError(t('book.getBookReadTimeFail') + error)
      return []
    }
  }

  static observableOne(eBookId: string): any {
    try {
      return useObservable<Book[], Book[]>(
        liveQuery(async () =>
          (await db.readTime.toArray()).filter((item) => item.eBookId === eBookId)
        ) as any
      )
    } catch (error) {
      toastError(t('book.getBookReadTimeFail') + error)
      return []
    }
  }

  static findByEbookId(eBookId: string) {
    try {
      return db.readTime.where('eBookId').equals(eBookId).toArray()
    } catch (error) {
      toastError(t('book.getBookReadTimeListFail') + error)
      return []
    }
  }
}

export class BookCoverAction {
  static add(value: BookCover) {
    try {
      return db.bookCover.put(value)
    } catch (error) {
      // toastError(t('book.addBookCoverFail') + error)
      return Promise.reject(error)
    }
  }

  static bulkAdd(value: BookCover[]) {
    try {
      return db.bookCover.bulkPut(value)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static update(bookId: string, cover: Uint8Array) {
    try {
      return db.bookCover.update(bookId, { cover })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static async findOne(bookId: string) {
    return await db.bookCover.where('bookId').equals(bookId).first()
  }
}
