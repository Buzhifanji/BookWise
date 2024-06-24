import { Book } from '@renderer/batabase'
import { createDialog } from '@renderer/shared'
import Edit from './Edit.vue'

export const editDialog = (book: Book) => createDialog(Edit, { book })
