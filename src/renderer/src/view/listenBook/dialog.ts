import { createDialog } from '@renderer/shared'
import ReaderListenBook from './ReaderListenBook.vue'

export function listenBookDialog(section: any[], toc: any[], bookId: string, page: number) {
  createDialog(ReaderListenBook, { section, toc, bookId, page })
}
