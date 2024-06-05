import { DomSource } from '@book-wise/web-highlight'
import { Note, db } from '@renderer/batabase'
import { now } from '@renderer/shared'

export class NoteAction {
  static async remove(ids: string[]) {
    await db.notes.bulkDelete(ids)
  }

  static async create({
    sources,
    eBookId,
    chapterIndex,
    chapterName,
    notes
  }: {
    sources: DomSource
    eBookId: string
    chapterIndex: number
    chapterName: string
    notes: string
  }) {
    const isExist = await this.findById(sources.id)
    if (isExist) return null

    const note: Note = {
      id: sources.id,
      eBookId,
      chapterIndex,
      chapterName,
      bookText: sources.text,
      notes,
      createTime: now(),
      updateTime: now(),
      isDelete: null,
      colorName: sources.className,
      startDomMeta: JSON.stringify(sources.startDomMeta),
      endDomMeta: JSON.stringify(sources.endDomMeta)
    }

    await db.notes.add(note)
    return note
  }

  static async findByEBookId(eBookId: string) {
    return await db.notes.where('eBookId').equals(eBookId).toArray()
  }

  static async findById(id: string) {
    return await db.notes.where('id').equals(id).first()
  }
}
