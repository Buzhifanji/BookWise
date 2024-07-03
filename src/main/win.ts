import { BrowserWindow } from 'electron'
import { join } from 'node:path'
import { getIcon } from './util'

const windowStore = new Map<String, number>() // 记录打开过的窗口，防止重复打开

export function createWindow() {
  const win = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    icon: getIcon(),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  return win
}

export function openWindows(url: string) {
  if (windowStore.has(url)) {
    const windowId = windowStore.get(url)!
    const win = BrowserWindow.fromId(windowId)
    if (win) {
      win.focus()
      return
    }
  }

  const newWin = createWindow()
  newWin.loadURL(url)
  windowStore.set(url, newWin.id)
  newWin.on('closed', () => {
    windowStore.delete(url)
  })
}
