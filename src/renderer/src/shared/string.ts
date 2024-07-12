import { split } from 'sentence-splitter'

export function spliteSentence(val: string) {
  try {
    return split(val)
      .filter((item) => item.type === 'Sentence')
      .map((item) => item.raw)
  } catch {
    return [val]
  }
}
