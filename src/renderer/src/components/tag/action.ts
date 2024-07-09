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

  static async update(id: string, tagName: string) {
    try {
      await db.tag.update(id, { tagName, updateTime: now() })
    } catch (error) {
      toastError('更新标签失败' + error)
      return Promise.reject(error)
    }
  }

  static async removeByIds(ids: string[]) {
    try {
      await db.tag.bulkDelete(ids)
    } catch (error) {
      toastError('删除书签失败' + error)
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

  static getAll() {
    return db.tag.toArray()
  }

  static findByIds(ids: string) {
    const id = ids.split(',')
    return db.tag.where('id').anyOf(id).toArray()
  }

  static findOne(id: string) {
    return db.tag.where('id').equals(id).first()
  }

  static toJSON(tag: Tag[]) {
    const result = tag.map((item) => ({ id: item.id, tagName: item.tagName }))
    return JSON.stringify(result)
  }

  static toTag(val: string) {
    try {
      return JSON.parse(val) as Tag[]
    } catch (error) {
      return []
    }
  }
}
