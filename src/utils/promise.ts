import { remove } from './array'

/**
 * 创建单例Promise
 */
interface CreateSingletonPromiseReturn<T> {
  (): Promise<T>
  reset: () => void
}
export function createSingletonPromise<T>(fn: () => Promise<T>): CreateSingletonPromiseReturn<T> {
  let _promise: Promise<T> | null = null

  function wrapper() {
    if (!_promise)
      _promise = fn()
    return _promise
  }
  wrapper.reset = async () => {
    const _prevPromise = _promise
    _promise = null
    if (_prevPromise)
      await _prevPromise
  }

  return wrapper
}

/**
 * 创建promise并发锁
 */
export interface PromiseLock {
  /**
   * 添加一个Prmise到锁中
   */
  add<T>(fn: () => Promise<T>): Promise<T>
  /**
   * 等待所有Prmise执行完毕
   */
  wait(): Promise<void>
  /**
   * 是否有Prmise正在执行
   */
  isWaiting(): boolean
  /**
   * 重置锁
   */
  reset(): void
  /**
   * 当前仍在等待的Promise数量
   */
  readonly length: number
}
export function createPromiseLock(): PromiseLock {
  const lockList: Promise<any>[] = []

  return {
    async add<T>(fn: () => Promise<T>): Promise<T> {
      const promise = fn()
      lockList.push(promise)
      try {
        return await promise
      }
      finally {
        remove(lockList, promise)
      }
    },
    async wait(): Promise<void> {
      await Promise.allSettled(lockList)
    },
    isWaiting(): boolean {
      return lockList.length > 0
    },
    reset() {
      lockList.length = 0
    },
    get length() {
      return lockList.length
    }
  }
}

/**
 * promise实现的睡眠函数
 */
export function sleep(delay: number, callback?: Function) {
  return new Promise<void>((resolve) => {
    setTimeout(async () => {
      await callback?.()
      resolve()
    }, delay)
  })
}
