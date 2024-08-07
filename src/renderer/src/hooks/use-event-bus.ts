import { useEventBus } from '@vueuse/core'

export const TTSbus = useEventBus<string>('tts')

export const bookLoadedSetionBus = useEventBus<string>('book-loaded-section')

export const listenBookBus = useEventBus<string>('listen-book')
