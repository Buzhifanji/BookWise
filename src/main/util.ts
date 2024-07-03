import path from 'path'

const resolve = (relativePath: string) => path.resolve(__dirname, relativePath)

export const getIcon = () => {
  if (process.platform === 'darwin') {
    return resolve('../../build/icon.icns')
  } else if (process.platform === 'win32') {
    return resolve('../../build/icon.ico')
  } else {
    return resolve('../../build/256x256.png')
  }
}
