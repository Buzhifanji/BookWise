import { Book } from '@renderer/batabase'
import { createDialog } from '@renderer/shared'
import Bookshelf from './Bookshelf.vue'

export const bookshelfDialog = (book: Book) => createDialog(Bookshelf, { book })
