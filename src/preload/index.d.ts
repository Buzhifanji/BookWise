import { ElectronAPI } from '@electron-toolkit/preload'

export interface API {
  readFile: (value: string) => Promise<Uint8Array>
  getFilePath: (value: File) => Promise<string>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
