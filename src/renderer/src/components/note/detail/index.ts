import { Note } from '@renderer/batabase'
import { createDialog } from '@renderer/shared'
import Detail from './Detail.vue'

export const detaiNotelDialog = (note: Note) => createDialog(Detail, { note })
