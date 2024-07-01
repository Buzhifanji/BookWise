import { describe, expect, test, vi } from 'vitest'
import { EventEmitter } from '../event-emitter'

describe('测试 event-emitter 类', () => {
  test('测试 on 函数是否执行', () => {
    const bus = new EventEmitter()
    const fn = vi.fn()

    bus.on('fn', fn)
    bus.emit('fn')

    expect(fn).toBeCalled()
  })

  test('测试 on 函数参数是否传递', () => {
    const bus = new EventEmitter()
    const fn = vi.fn((a) => a + 1)

    bus.on('param', (a) => fn(a))
    bus.emit('param', 2)

    expect(fn).toBeCalled()
    expect(fn).toHaveReturnedWith(3)
  })

  test('测试 多个 on 函数之间是否有影响', () => {
    const bus = new EventEmitter()
    const fn1 = vi.fn()
    const fn2 = vi.fn()
    const fn3 = vi.fn()

    bus.on('fn1', fn1)
    bus.on('fn2', fn2)
    bus.on('fn3', fn3)
    bus.emit('fn1', 2)

    expect(fn1).toBeCalled()
    expect(fn2).toHaveBeenCalledTimes(0)
    expect(fn3).toHaveBeenCalledTimes(0)
  })

  test('测试 on 函数是否去重', () => {
    const bus = new EventEmitter()
    const fn = vi.fn()

    bus.on('fn', fn)
    bus.on('fn', fn)
    bus.on('fn', fn)
    bus.emit('fn')

    expect(fn).toBeCalled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('测试 off 函数是否执行', () => {
    const bus = new EventEmitter()
    const fn = vi.fn()

    bus.on('test', fn)
    bus.off('test', fn)
    bus.emit('test')

    expect(fn).toHaveBeenCalledTimes(0)

    bus.on('test', fn)
    bus.emit('test')
    expect(fn).toBeCalled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('测试 off 函数是否执行', () => {
    const bus = new EventEmitter()
    const fn = vi.fn()

    bus.on('test', fn)
    bus.off('test', fn)
    bus.emit('test')

    expect(fn).toHaveBeenCalledTimes(0)

    bus.on('test', fn)
    bus.emit('test')
    expect(fn).toBeCalled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  test('测试 off 函数是否会影响其它函数', () => {
    const bus = new EventEmitter()

    const fn1 = vi.fn()
    const fn2 = vi.fn()
    const fn3 = vi.fn()

    bus.on('fn1', fn1)
    bus.on('fn2', fn2)
    bus.on('fn3', fn3)

    bus.off('fn1', fn1)
    bus.emit('fn1')

    expect(fn1).toHaveBeenCalledTimes(0)

    bus.emit('fn2')
    expect(fn2).toBeCalled()

    bus.emit('fn3')
    expect(fn3).toBeCalled()
  })

  test('offAll 函数', () => {
    const bus = new EventEmitter()
    const fn1 = vi.fn()
    const fn2 = vi.fn()

    bus.on('fn1', fn1)
    bus.on('fn2', fn1)

    bus.offAll()

    bus.emit('fn1')
    bus.emit('fn2')

    expect(fn1).toHaveBeenCalledTimes(0)
    expect(fn2).toHaveBeenCalledTimes(0)
  })
})