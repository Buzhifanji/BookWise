import { Book } from '@renderer/batabase'
import { createDialog } from '@renderer/shared'
import Score from './Score.vue'

export const scroreDialog = (book: Book) => createDialog(Score, { book })
