import { DomSource } from '@book-wise/web-highlight'
import { Note, db } from '@renderer/batabase'
import { now, toastError } from '@renderer/shared'
import { t } from '@renderer/view/setting'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'

export interface NoteText {
  value: string
  time: number
}

export class NoteAction {
  static async add({
    sources,
    eBookId,
    chapterName,
    notes,
    tag
  }: {
    sources: DomSource[]
    eBookId: string
    chapterName: string
    notes: string
    tag: string
  }) {
    try {
      if (sources.length === 0) return null
      const sourceId = sources[0].id
      const isExist = await this.findBySourceId(sourceId)
      if (isExist) return null

      const res: Note = {
        id: uuidv4(),
        sourceId: sourceId,
        eBookId,
        notes,
        chapterName,
        domSource: JSON.stringify(sources),
        createTime: now(),
        updateTime: now(),
        tag,
        isDelete: null
      }

      await db.notes.put(res)
      return res
    } catch (error) {
      toastError(t('note.addNoteFail'))
      return Promise.reject(error)
    }
  }

  static removeOne(id: string) {
    try {
      return db.notes.delete(id)
    } catch (error) {
      toastError(t('common.removeFail'))
      return Promise.reject(error)
    }
  }

  static removeBySoureIds(sourceId: string[]) {
    return db.notes.where('sourceId').anyOf(sourceId).delete()
  }

  static update(id: string, value: Partial<Note>) {
    try {
      return db.notes.update(id, { ...value, updateTime: now() })
    } catch (error) {
      toastError(t('common.updateFail'))
      return Promise.reject(error)
    }
  }

  static async updateBySourceId(sourceId: string, value: Partial<Note>) {
    try {
      const note = await this.findBySourceId(sourceId)
      if (note) {
        await this.update(note.id, value)
        return true
      }
      return false
    } catch (error) {
      toastError(t('common.updateFail'))
      return Promise.reject(error)
    }
  }

  static observable() {
    try {
      return useObservable<Note[], Note[]>(
        liveQuery(async () => (await db.notes.toArray()).filter((item) => !item.isDelete)) as any
      )
    } catch (error) {
      toastError(t('note.getNoteFail'))
      return ref([] as Note[])
    }
  }

  static observableByEBookId(eBookId: string) {
    try {
      return useObservable<Note[], Note[]>(
        liveQuery(async () =>
          (await db.notes.where('eBookId').equals(eBookId).toArray()).filter(
            (item) => !item.isDelete
          )
        ) as any
      )
    } catch (error) {
      toastError(t('note.getNoteListFail'))
      return ref([] as Note[])
    }
  }

  static async findByEBookId(eBookId: string) {
    return await db.notes.where('eBookId').equals(eBookId).toArray()
  }

  static async findBySourceId(id: string) {
    return await db.notes.where('sourceId').equals(id).first()
  }

  static async findBySourceIds(ids: string[]) {
    return await db.notes.where('sourceId').anyOf(ids).toArray()
  }

  static async findBookPageNotes(eBookId: string, page: string) {
    const bookNotes = await this.findByEBookId(eBookId)
    const result: Note[] = []
    for (const note of bookNotes) {
      const source = this.getDomSource(note.domSource)
      const pageNote = source.find((item) => item.page === page)
      if (pageNote) {
        result.push({ ...note, domSource: JSON.stringify([pageNote]) })
      }
    }
    return result
  }

  static getAll() {
    return db.notes.toArray()
  }

  static noteToDomSource(note: Note): DomSource {
    const source = this.getDomSource(note.domSource)[0]
    return {
      id: note.sourceId,
      text: source.text,
      className: source.className,
      tagName: 'span',
      startDomMeta: source.startDomMeta,
      endDomMeta: source.endDomMeta,
      page: source.page
    }
  }

  static getDomSource(value: string | undefined) {
    if (!value) return []

    return JSON.parse(value) as DomSource[]
  }

  static getNoteText(value: string | undefined) {
    if (!value) return []

    return JSON.parse(value) as NoteText[]
  }
}
