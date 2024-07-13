import { ElectronAPI } from '@electron-toolkit/preload'

export interface API {
  readFile: (value: string) => Promise<Uint8Array>
  getFilePath: (value: File) => Promise<string>
}

export interface Store {
  get: (key: string) => any
  set: (key: string, value: any) => void
  clear: () => void
  watch: (val: Function) => any
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
    store: Store
  }
}
