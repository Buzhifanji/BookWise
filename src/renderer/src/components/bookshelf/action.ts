import { Bookshelf, db } from '@renderer/batabase'
import { now, toastError } from '@renderer/shared'
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
      return await this.findOne(val.id)
    } catch (error) {
      toastError('新增书架失败' + error)
      return Promise.reject(error)
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
