export type StyleName =
  | 'affectionate'
  | 'angry'
  | 'calm'
  | 'cheerful'
  | 'disgruntled'
  | 'embarrassed'
  | 'fearful'
  | 'general'
  | 'gentle'
  | 'sad'
  | 'serious'

export interface SsmlOptions {
  pitch?: number
  rate?: number
  style?: StyleName
  voice: string
}

const voiceTemplate = (input: string, { voice }: Pick<SsmlOptions, 'voice'>) =>
  `<voice name="${voice}">${input}</voice>`

const styleTemplate = (input: string, { style }: Pick<SsmlOptions, 'style'>) => {
  if (!style) return input
  return `<mstts:express-as style="${style}">${input}</mstts:express-as>`
}

const prosodyTemplate = (input: string, { pitch, rate }: Pick<SsmlOptions, 'pitch' | 'rate'>) => {
  if (!pitch && !rate) return input
  return `<prosody pitch="${Math.floor((pitch || 1) * 100)}%" rate="${Math.floor(
    (rate || 1) * 100
  )}%">${input}</prosody>`
}
const speackTemplate = (input: string) =>
  `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">${input}</speak>`

export const genSSML = (input: string, options: SsmlOptions) => {
  let ssml = prosodyTemplate(input, options)
  ssml = styleTemplate(ssml, options)
  ssml = voiceTemplate(ssml, options)
  ssml = speackTemplate(ssml)

  return ssml
}

export const getHeadersAndData = (data: string) => {
  const headers: { [key: string]: string } = {}
  for (const line of data.slice(0, data.indexOf('\r\n\r\n')).split('\r\n')) {
    const [key, value] = line.split(':', 2)
    headers[key] = value
  }
  return { data: data.slice(data.indexOf('\r\n\r\n') + 4), headers }
}

export const genSendContent = (header: { [key: string]: string }, data: string) => {
  const content: any[] = []
  for (const [key, value] of Object.entries(header)) {
    content.push(`${key}:${value}`)
  }
  content.push('', data)
  return content.join('\r\n')
}
