import { useEventBus } from '@vueuse/core'

export const TTSbus = useEventBus<{ id: string; value: ArrayBuffer }>('tts')
