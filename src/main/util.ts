import path from 'path'

const resolve = (relativePath: string) => path.resolve(__dirname, relativePath)

export const getIcon = () => {
  if (process.platform === 'darwin') {
    return resolve('../../resources/icon.icns')
  } else if (process.platform === 'win32') {
    return resolve('../../resources/icon.ico')
  } else {
    return resolve('../../resources/256x256.png')
  }
}
