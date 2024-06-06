import { DomSource } from '@book-wise/web-highlight'
import { Note, db } from '@renderer/batabase'
import { now } from '@renderer/shared'
import { v4 as uuidv4 } from 'uuid'

export class NoteAction {
  static async remove(ids: string[]) {
    await db.notes.bulkDelete(ids)
  }

  static async bulkAdd({
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
    const isExist = await this.findById(sources[0].id)
    if (isExist) return null

    const res: Note[] = sources.map((source) => {
      return {
        id: uuidv4(),
        sourceId: source.id,
        eBookId,
        chapterName,
        bookText: source.text,
        notes,
        createTime: now(),
        updateTime: now(),
        isDelete: null,
        colorName: source.className,
        page: source.page,
        startDomMeta: JSON.stringify(source.startDomMeta),
        endDomMeta: JSON.stringify(source.endDomMeta)
      }
    })

    await db.notes.bulkAdd(res)
    return res
  }

  static async findByEBookId(eBookId: string) {
    return await db.notes.where('eBookId').equals(eBookId).toArray()
  }

  static async findById(id: string) {
    return await db.notes.where('id').equals(id).first()
  }

  static noteToDomSource(note: Note): DomSource {
    return {
      id: note.sourceId,
      text: note.bookText,
      className: note.colorName,
      tagName: 'span',
      startDomMeta: JSON.parse(note.startDomMeta),
      endDomMeta: JSON.parse(note.endDomMeta),
      page: note.page
    }
  }
}
