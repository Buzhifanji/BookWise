import { DomSource } from '@book-wise/web-highlight'
import { Note, db } from '@renderer/batabase'
import { now } from '@renderer/shared'
import { useObservable } from '@vueuse/rxjs'
import { liveQuery } from 'dexie'
import { v4 as uuidv4 } from 'uuid'

export class NoteAction {
  static async add({
    sources,
    eBookId,
    chapterName,
    notes
  }: {
    sources: DomSource[]
    eBookId: string
    chapterName: string
    notes: string
  }) {
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
      isDelete: null
    }

    await db.notes.add(res)
    return res
  }

  static removeOne(id: string) {
    return db.notes.delete(id)
  }

  static removeBySoureIds(sourceId: string[]) {
    return db.notes.where('sourceId').anyOf(sourceId).delete()
  }

  static set(id: string, value: Partial<Note>) {
    return db.notes.update(id, { ...value })
  }

  static observable() {
    return useObservable<Note[], Note[]>(
      liveQuery(async () => (await db.notes.toArray()).filter((item) => !item.isDelete)) as any
    )
  }

  static async findByEBookId(eBookId: string) {
    return await db.notes.where('eBookId').equals(eBookId).toArray()
  }

  static async findBySourceId(id: string) {
    return await db.notes.where('sourceId').equals(id).first()
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
}
