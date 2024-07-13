import { ipcRenderer } from 'electron'

const setStore = (key: string, value: any) => {
  ipcRenderer.send('setStore', { key, value })
}

const getStore = (key: string) => {
  return ipcRenderer.sendSync('getStore', key)
}

const clearStore = () => {
  ipcRenderer.send('clearStore')
}

export const store = {
  get: getStore,
  set: setStore,
  clear: clearStore
}
