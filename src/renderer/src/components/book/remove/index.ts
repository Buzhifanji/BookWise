import { Book } from '@renderer/batabase'
import { createDialog } from '@renderer/shared'
import Remove from './Remove.vue'

export const removeDialog = (book: Book, isRecycleBin: boolean, isForce: boolean) =>
  createDialog(Remove, { book, isRecycleBin, isForce })
