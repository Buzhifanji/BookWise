import { Book, db } from '@renderer/batabase'
import { now } from '@renderer/shared'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'

export class BookAction {
  static removeOne(id: string, isSoft: boolean) {
    if (isSoft) {
      return db.books.update(id, { isDelete: now() })
    } else {
      return db.books.delete(id)
    }
  }

  static editeOne(id: string, value: Partial<Book>) {
    return db.books.update(id, { ...value })
  }

  static restoreOne(id: string) {
    return db.books.update(id, { isDelete: null })
  }

  static observable() {
    return useObservable<Book[], Book[]>(
      liveQuery(async () => (await db.books.toArray()).filter((item) => !item.isDelete)) as any
    )
  }
}
