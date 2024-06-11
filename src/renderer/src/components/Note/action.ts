import { Note, db } from '@renderer/batabase'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'

export class NoteAction {
  static removeOne(id: string) {
    db.notes.delete(id)
  }

  static editeOne(id: string, value: Partial<Note>) {
    return db.books.update(id, { ...value })
  }

  static observable() {
    return useObservable<Note[], Note[]>(
      liveQuery(async () => (await db.notes.toArray()).filter((item) => !item.isDelete)) as any
    )
  }
}
