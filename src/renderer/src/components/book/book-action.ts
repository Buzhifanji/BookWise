import { Book, db } from '@renderer/batabase'
import { now } from '@renderer/shared'

export class BookAction {
  static removeOne(id: string, isSoft: boolean) {
    if (isSoft) {
    return  db.books.update(id, { isDelete: now() })
    } else {
      return  db.books.delete(id)
    }
  }

  static editeOne(id: string,value: Partial<Book>) {
    return db.books.update(id, {...value})
  }

  static restoreOne(id: string) {
    return db.books.update(id, { isDelete: null })
  }
}
