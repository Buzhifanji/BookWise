import { Book, db } from '@renderer/batabase'
import { RouterName, router } from '@renderer/route'
import { isElectron, now } from '@renderer/shared'
import { settingStore } from '@renderer/store'
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

export function bookJump(id: string) {
  const isBlank = settingStore.value.isOpenNew
  if (isElectron) {
    // 桌面版
    if (isBlank) {
      const { href } = router.resolve({ name: RouterName.Reader, params: { id } })
      window.open(href, '_blank')
    } else {
      router.push({ name: RouterName.Reader, params: { id } })
    }
  } else {
    // 网页版
    if (isBlank) {
      const { href } = router.resolve({ name: RouterName.Reader, params: { id } })
      window.open(href, '_blank')
    } else {
      router.push({ name: RouterName.Reader, params: { id } })
    }
  }
}
