import { BookAudio } from '@renderer/batabase'
import { BookAudioAction } from '@renderer/components'

export const useAudio = () => {
  const audiosMap = new Map<string, BookAudio>()

  async function loadAudio(bookId: string, voice: string) {
    const loacl = await BookAudioAction.findByBookIdAndVoice(bookId, voice)
    if (loacl) {
      audiosMap.set(bookId, loacl)
    } else {
    }
  }
}
