import { Book, BookContent, db } from '@renderer/batabase'
import { RouterName, router } from '@renderer/route'
import { isElectron, now, toastError } from '@renderer/shared'
import { settingStore } from '@renderer/store'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'

export class BookAction {
  static bulkAdd(book: Book[]) {
    try {
      return db.books.bulkAdd(book)
    } catch (error) {
      toastError('导入图书失败')
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
      toastError('删除失败')
      return Promise.reject(error)
    }
  }

  static update(id: string, value: Partial<Book>) {
    try {
      return db.books.update(id, { ...value })
    } catch (error) {
      toastError('编辑失败')
      return Promise.reject(error)
    }
  }

  static restoreOne(id: string) {
    try {
      return db.books.update(id, { isDelete: null })
    } catch (error) {
      toastError('还原失败')
      return Promise.reject(error)
    }
  }

  static fineOne(id: string) {
    try {
      return db.books.get(id)
    } catch (error) {
      toastError('获取图书失败')
      return Promise.reject(error)
    }
  }
  static getAll() {
    try {
      return db.books.toArray()
    } catch (error) {
      toastError('读取图书列表失败')
      return Promise.reject(error)
    }
  }

  static observableOne(id: string): any {
    try {
      return useObservable<Book[], Book[]>(
        liveQuery(async () => (await db.books.toArray()).find((item) => item.id === id)) as any
      )
    } catch (error) {
      toastError('读取图书列表失败')
      return undefined
    }
  }

  static observable(isDelete = false) {
    try {
      return useObservable<Book[], Book[]>(
        liveQuery(async () =>
          (await db.books.toArray()).filter((item) => (isDelete ? item.isDelete : !item.isDelete))
        ) as any
      )
    } catch (error) {
      toastError('读取图书列表失败')
      return [] as Book[]
    }
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

export class BookContentAction {
  static bulkAdd(bookContentList: BookContent[]) {
    try {
      return db.bookContents.bulkPut(bookContentList)
    } catch (error) {
      toastError('导入图书内容失败')
      return Promise.reject(error)
    }
  }

  static async findOne(bookId: string) {
    return await db.bookContents.where('bookId').equals(bookId).first()
  }
}
