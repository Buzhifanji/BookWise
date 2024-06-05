import { db } from '@renderer/batabase'
import { now } from '@renderer/shared'

export class BookAction {
  static removeOne(id: string, isSoft: boolean) {
    if (isSoft) {
      db.books.update(id, { isDelete: now() })
    } else {
      db.books.delete(id)
    }
  }

  static restoreOne(id: string) {
    db.books.update(id, { isDelete: null })
  }
}
