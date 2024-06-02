/**
 * 等待多少毫秒后执行
 * @param time
 * @returns
 */
export function wait(time: number = 300) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}