import { voiceList } from '../data'
import { flatten } from '../shared'
import { edgeVoiceList } from './edgeVoiceList'

export const getEdgeVoiceOptions = (locale?: string): { id: string; value: string }[] => {
  const data =
    locale && (edgeVoiceList as any)[locale]
      ? (edgeVoiceList as any)[locale] || []
      : flatten(Object.values(edgeVoiceList))
  return data.map((voice: any) => ({ id: (voiceList as any)?.[voice] || voice, value: voice }))
}
