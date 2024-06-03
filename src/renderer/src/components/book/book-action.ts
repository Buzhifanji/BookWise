import { Book, db } from '@renderer/batabase'
import { settingStore } from '@renderer/store'

export function removeOneBook(value: Book | undefined) {
  if (!value) return
  const id = value.id
  if (settingStore.value.isOpenRecyleBin) {
    db.books.update(id, { isDelete: new Date().getTime() })
  } else {
    db.books.delete(id)
  }
}
