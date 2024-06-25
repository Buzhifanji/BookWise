/**
 * 等待多少毫秒后执行
 * @param time
 * @returns
 */
export function wait(time: number = 300) {
  return new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      resolve()
      timer && clearTimeout(timer)
    }, time)
  })
}

export function now() {
  return new Date().getTime()
}

/**
 * 获取两个时间的时间差（分钟）
 * @param start
 * @param end
 * @returns
 */
export function getInterval(start: number, end: number) {
  return +((end - start) / 1000 / 60).toFixed()
}
