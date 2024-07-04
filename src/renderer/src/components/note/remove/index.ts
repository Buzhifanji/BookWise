import { Note } from '@renderer/batabase'
import { createDialog } from '@renderer/shared'
import Remove from './Remove.vue'

export const removeNoteDialog = (note: Note) => createDialog(Remove, { note })
