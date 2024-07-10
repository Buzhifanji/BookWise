import { TTSbus } from '@renderer/hooks'
import { EdgeSpeechAPI, EdgeSpeechPayload, EdgeSpeechTTS } from './edge-tts'

type options = EdgeSpeechAPI & EdgeSpeechPayload

export class TTSFile {
  audioBuffer: Map<string, ArrayBuffer[]> = new Map()
  private tts: EdgeSpeechTTS

  constructor(public option: options) {
    this.tts = new EdgeSpeechTTS({ locale: option.locale! })
  }

  updateOption(option: options) {
    Object.assign(this.option, option)
    this.clear()
    this.tts = new EdgeSpeechTTS({ locale: option.locale! })
  }

  async create(connectId: string, input: string) {
    TTSbus.on((val) => {
      const { id, value } = val
      const buffer = this.audioBuffer.get(id) || []
      buffer.push(value)
      this.audioBuffer.set(id, buffer)
    })

    await this.tts.create({ input, connectId, options: { voice: 'zh-CN-XiaoxiaoNeural' } })
  }

  clear() {
    this.audioBuffer.clear()
  }
}

export class TTSAutio {
  audioBuffer: Map<string, ArrayBuffer[]> = new Map()
  private tts: EdgeSpeechTTS

  constructor(public option: options) {
    this.tts = new EdgeSpeechTTS({ locale: option.locale! })
  }

  updateOption(option: options) {
    Object.assign(this.option, option)
    this.tts = new EdgeSpeechTTS({ locale: option.locale! })
  }

  async read(connectId: string, input: string) {
    // const connectId = uuidv4().replaceAll('-', '')
    TTSbus.on((val) => {
      const { id, value } = val
      const buffer = this.audioBuffer.get(id) || []
      buffer.push(value)
      this.audioBuffer.set(id, buffer)
    })
    await this.tts.create({ input, connectId, options: { voice: 'zh-CN-XiaoxiaoNeural' } })
  }

  play() {}

  pause() {}

  clear() {}
}
