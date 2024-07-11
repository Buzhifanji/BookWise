import { useEventBus } from '@vueuse/core'

export const TTSbus = useEventBus<string>('tts')
