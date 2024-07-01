import { describe, expect, test, vi } from 'vitest'
import { Hook } from '../hooks'

describe('测试 hook 类', () => {
  test('测试 hook 默认的 name', () => {
    const hook = new Hook()
    expect(hook.name).toBe('')
  })

  test('测试 hook 自定义的 name', () => {
    const hook = new Hook('a')
    expect(hook.name).toBe('a')
  })

  test('测试 tap 函数是否执行', () => {
    const hook = new Hook('a')
    const fn = vi.fn()

    const stop = hook.tap(fn)
    hook.call()

    expect(fn).toBeCalled()

    stop()

    hook.call()

    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('测试 tap 函数是否去重 ', () => {
    const hook = new Hook('a')

    const fn = vi.fn()

    hook.tap(fn)
    hook.tap(fn)
    hook.tap(fn)

    hook.call()

    expect(fn).toHaveBeenCalledTimes(1)

  })

  test('测试 tap 接受多个函数，是否正常执行', () => {
    const hook = new Hook('a')

    const fn1 = vi.fn()
    const fn2 = vi.fn()
    const fn3 = vi.fn()

    const stop1 = hook.tap(fn1)
    hook.tap(fn2)
    hook.tap(fn3)

    hook.call()

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn3).toHaveBeenCalledTimes(1)

    stop1()

    hook.call()

    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(2)
    expect(fn3).toHaveBeenCalledTimes(2)
  })

  test('测试 remvoe 函数', () => {
    const hook = new Hook('a')

    const fn1 = vi.fn()
    const fn2 = vi.fn()
    const fn3 = vi.fn()

    hook.tap(fn1)
    hook.tap(fn2)
    hook.tap(fn3)

    expect(hook.isEmpty()).false

    hook.remove(fn1)

    hook.call()

    expect(fn1).toHaveBeenCalledTimes(0)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn3).toHaveBeenCalledTimes(1)

    hook.remove(fn2)

    expect(hook.isEmpty()).false

    hook.call()

    expect(fn1).toHaveBeenCalledTimes(0)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn3).toHaveBeenCalledTimes(2)

    hook.remove(fn3)

    hook.call()

    expect(hook.isEmpty()).true

    expect(fn1).toHaveBeenCalledTimes(0)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn3).toHaveBeenCalledTimes(2)
  })

  test('测试 call 函数传递参数是否正常', () => {
    const hook = new Hook('a')

    const fn1 = vi.fn((a) => a)
    const fn2 = vi.fn(a => a + 1)
    const fn3 = vi.fn(a => a - 1)

    hook.tap(fn1)
    hook.tap(fn2)
    hook.tap(fn3)

    hook.call(1)

    expect(fn1).toHaveReturnedWith(1)
    expect(fn2).toHaveReturnedWith(2)
    expect(fn3).toHaveReturnedWith(0)
  })
})