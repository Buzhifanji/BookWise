import { db } from '@renderer/batabase'

export class BookAction {
  static removeOne(id: string, isSoft: boolean) {
    if (isSoft) {
      db.books.update(id, { isDelete: new Date().getTime() })
    } else {
      db.books.delete(id)
    }
  }

  static restoreOne(id: string) {
    db.books.update(id, { isDelete: null })
  }
}
