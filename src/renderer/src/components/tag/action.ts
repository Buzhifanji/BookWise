import { Tag, db } from '@renderer/batabase'
import { now, toastError } from '@renderer/shared'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { v4 as uuidv4 } from 'uuid'

export class TagAction {
  static async add(tagName: string) {
    try {
      const time: Tag = {
        id: uuidv4(),
        tagName,
        createTime: now(),
        updateTime: now(),
        isDelete: null
      }
      await db.tag.put(time)
      return await this.findOne(time.id)
    } catch (error) {
      toastError('新增标签失败' + error)
      return Promise.reject(error)
    }
  }

  static observable(isDelete = false) {
    try {
      return useObservable<Tag[], Tag[]>(
        liveQuery(async () =>
          (await db.tag.toArray()).filter((item) => (isDelete ? item.isDelete : !item.isDelete))
        ) as any
      )
    } catch (error) {
      toastError('读取图书列表失败' + error)
      return [] as Tag[]
    }
  }

  static observableByIds(ids: string) {
    const id = new Set(ids.split(','))
    try {
      return useObservable<Tag[], Tag[]>(
        liveQuery(async () => (await db.tag.toArray()).filter((item) => id.has(item.id))) as any
      )
    } catch (error) {
      toastError('读取图书列表失败' + error)
      return [] as Tag[]
    }
  }

  static findByIds(ids: string) {
    const id = ids.split(',')
    return db.tag.where('id').anyOf(id).toArray()
  }

  static findOne(id: string) {
    return db.tag.where('id').equals(id).first()
  }
}
