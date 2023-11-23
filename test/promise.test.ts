import { describe, expect, it } from 'vitest'
import { createPromiseLock, createSingletonPromise, sleep } from '../src/utils/promise'

describe('createSingletonPromise', () => {
  it('should work', async () => {
    let count = 0
    const fn = async () => {
      count++
      return count
    }

    const singletonPromise = createSingletonPromise(fn)

    // 测试单例Promise是否只执行一次
    const result1 = await singletonPromise()
    const result2 = await singletonPromise()
    expect(result1).toBe(1)
    expect(result2).toBe(1)

    // 测试reset方法
    await singletonPromise.reset()
    const result3 = await singletonPromise()
    expect(result3).toBe(2)
  })
})

describe('createPromiseLock', () => {
  it('createPromiseLock', async ({ expect }) => {
    const lock = createPromiseLock()

    let task1Done = false
    const task1 = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      task1Done = true
      return 'task1'
    }

    let task2Done = false
    const task2 = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      task2Done = true
      return 'task2'
    }

    const promise1 = lock.add(task1)
    const promise2 = lock.add(task2)

    expect(lock.isWaiting()).toBe(true)
    expect(lock.length).toBe(2)

    const result2 = await promise2
    expect(result2).toBe('task2')
    expect(task2Done).toBe(true)
    expect(lock.length).toBe(1)

    const result1 = await promise1
    expect(result1).toBe('task1')
    expect(task1Done).toBe(true)
    expect(lock.length).toBe(0)

    expect(lock.isWaiting()).toBe(false)

    lock.reset()
    expect(lock.length).toBe(0)
  })
})

describe.only('sleep function', () => {
  it('should delay execution', async () => {
    const startTime = Date.now()
    await sleep(1000)
    const endTime = Date.now()

    const delay = endTime - startTime
    expect(delay).toBeGreaterThanOrEqual(1000)
  })

  it('should call the callback after the delay', async () => {
    let callbackCalled = false
    await sleep(1000, () => {
      callbackCalled = true
    })

    expect(callbackCalled).toBe(true)
  })
})
