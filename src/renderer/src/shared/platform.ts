export const isElectron = navigator.userAgent.toLowerCase().indexOf('electron/') > -1

// export const isWindows = isElectron ? window?.electron?.process.platform === 'win32' : false

// export const isMac = isElectron
//   ? window?.electron?.process.platform
//   : navigator.appVersion.indexOf('Mac') !== -1

// export const CmdOrCtrl = isElectron && isMac ? 'Cmd' : 'Ctrl'

// export const isSafari = /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent)

// export const isLinux = isElectron
//   ? window?.electron?.isLinux
//   : navigator.appVersion.indexOf('Linux') !== -1
