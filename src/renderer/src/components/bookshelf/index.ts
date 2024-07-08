import { Book } from '@renderer/batabase'
import { createDialog } from '@renderer/shared'
import Add from './Add.vue'
import Edit from './Edit.vue'

export const addBookshelfDialog = (book: Book) => createDialog(Add, { book })

export const editBookshelfDialog = () => createDialog(Edit, {})
