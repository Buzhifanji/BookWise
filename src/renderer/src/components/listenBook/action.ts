import { db } from '@renderer/batabase'
import { BookAudio } from '@renderer/batabase/book-audio'
import { toastError } from '@renderer/shared'

/**
 * 书籍音频
 */
export class BookAudioAction {
  static add(audio: BookAudio) {
    try {
      return db.bookAudio.put(audio)
    } catch (error) {
      toastError('添加音频失败：' + error)
      return Promise.reject(error)
    }
  }

  static findByBookId(bookId: string) {
    return db.bookAudio.where('bookId').equals(bookId).toArray()
  }

  static removeByBookId(bookId: string) {
    return db.bookAudio.where('bookId').equals(bookId).delete()
  }
}
