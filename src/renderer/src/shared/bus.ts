import { useEventBus } from '@vueuse/core'

export const pdfBus = useEventBus<string>('pdf-event_bus')
