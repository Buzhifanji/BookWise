import { useEventBus } from '@vueuse/core'

export const useNoteEventBus = () => useEventBus('note-event')
