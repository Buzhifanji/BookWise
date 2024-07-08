import { Bookshelf, db } from '@renderer/batabase'
import { now, toastError } from '@renderer/shared'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { v4 as uuidv4 } from 'uuid'

export class BookshelfAction {
  static async add(name: string) {
    try {
      const val: Bookshelf = {
        id: uuidv4(),
        name,
        createTime: now(),
        updateTime: now(),
        isDelete: null
      }
      await db.bookshelf.put(val)
      return val
    } catch (error) {
      toastError('新增书架失败' + error)
      return Promise.reject(error)
    }
  }

  static async update(id: string, name: string) {
    try {
      await db.bookshelf.update(id, { name, updateTime: now() })
    } catch (error) {
      toastError('更新书架失败' + error)
      return Promise.reject(error)
    }
  }

  static async removeByIds(id: string[]) {
    try {
      await db.bookshelf.bulkDelete(id)
    } catch (error) {
      toastError('删除书架失败' + error)
      return Promise.reject(error)
    }
  }

  static observable() {
    try {
      return useObservable<Bookshelf[], Bookshelf[]>(
        liveQuery(async () => await db.bookshelf.toArray()) as any
      )
    } catch (error) {
      // toastError(t('book.getBookListFail') + error)
      return [] as Bookshelf[]
    }
  }

  static getAll() {
    return db.bookshelf.toArray()
  }

  static findOne(id: string) {
    return db.bookshelf.where('id').equals(id).first()
  }

  static toJSON(tag: Bookshelf) {
    return JSON.stringify(tag)
  }

  static toBookshelf(val: string) {
    try {
      return val ? JSON.parse(val) : ''
    } catch (error) {
      return ''
    }
  }
}
