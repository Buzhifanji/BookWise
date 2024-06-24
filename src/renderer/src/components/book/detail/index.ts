import { Book } from '@renderer/batabase'
import { createDialog } from '@renderer/shared'
import Detail from './Detail.vue'

export const detailDialog = (book: Book) => createDialog(Detail, { book })
