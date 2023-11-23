import { describe, expect, it } from 'vitest'
import { debounce, throttle } from '../src/utils/common'

describe.skip('throttle', () => {
  it('should work', async () => {
    let counter = 0
    const increment = () => { counter++ }
    const throttledIncrement = throttle(1000, increment)

    // 在接下来的 3 秒内，每隔 200 毫秒就尝试调用 throttledIncrement 函数
    for (let i = 0; i < 15; i++)
      setTimeout(throttledIncrement, i * 200)

    // 等待 3.5 秒，确保所有的 setTimeout 都已经执行
    await new Promise(resolve => setTimeout(resolve, 3500))

    // 由于我们使用了节流函数，所以即使 throttledIncrement 函数实际上是每 200 毫秒就被尝试调用一次，
    // 但 counter 应该只会被增加 4 次（每秒一次）
    expect(counter).toBe(4)
  })

  it('should not call the function immediately when noLeading is true', async () => {
    let counter = 0
    const increment = () => { counter++ }
    const throttledIncrement = throttle(1000, increment, { noLeading: true })

    throttledIncrement()

    // 等待 500 毫秒
    await new Promise(resolve => setTimeout(resolve, 500))

    // 由于我们设置了 noLeading 为 true，所以即使我们调用了 throttledIncrement 函数，
    // 但 counter 的值应该仍然为 0
    expect(counter).toBe(0)
  })

  it('should not call the function after delay when noTrailing is true', async () => {
    let counter = 0
    const increment = () => { counter++ }
    const throttledIncrement = throttle(1000, increment, { noTrailing: true })

    throttledIncrement()

    // 等待 1500 毫秒
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 由于我们设置了 noTrailing 为 true，所以即使我们等待了超过 delay 的时间，
    // 但 counter 的值应该仍然为 1，因为 throttledIncrement 函数不会在 delay 后再次调用
    expect(counter).toBe(1)
  })

  it('should behave as debounce when debounceMode is true', async () => {
    let counter = 0
    const increment = () => { counter++ }
    const throttledIncrement = throttle(1000, increment, { debounceMode: true })

    throttledIncrement()
    throttledIncrement()
    throttledIncrement()

    // 等待 500 毫秒
    await new Promise(resolve => setTimeout(resolve, 500))

    // 由于我们设置了 debounceMode 为 true，所以 throttledIncrement 函数应该表现得像 debounce 函数，
    // 即在一段时间内的多次调用应该只会导致一次实际的调用。因此，counter 的值应该为 1
    expect(counter).toBe(1)
  })
})

describe.skip('debounce', () => {
  it('should work', async () => {
    let counter = 0
    const increment = () => { counter++ }
    const debouncedIncrement = debounce(1000, increment)

    debouncedIncrement()
    debouncedIncrement()
    debouncedIncrement()

    // 等待 1500 毫秒
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 由于我们没有设置 atBegin，所以在 delay 时间内的多次调用应该只会导致一次实际的调用
    // 因此，counter 的值应该为 1
    expect(counter).toBe(1)
  })

  it('should work with atBegin', async () => {
    let counter = 0
    const increment = () => { counter++ }
    const debouncedIncrement = debounce(1000, increment, { atBegin: true })

    debouncedIncrement()

    // 等待 500 毫秒
    await new Promise(resolve => setTimeout(resolve, 500))

    // 由于我们设置了 atBegin 为 true，所以在第一次调用时，debouncedIncrement 函数应该立即执行
    // 因此，counter 的值应该为 1
    expect(counter).toBe(1)

    // 等待 1500 毫秒
    await new Promise(resolve => setTimeout(resolve, 1500))
    debouncedIncrement()
    // 由于我们设置了 atBegin 为 true，所以在 delay 时间后的第二次调用，debouncedIncrement 函数应该再次执行
    // 因此，counter 的值应该为 2
    expect(counter).toBe(2)
  })

  it('should cancel the debounced function call', async () => {
    let counter = 0
    const increment = () => { counter++ }
    const debouncedIncrement = debounce(1000, increment)

    debouncedIncrement()
    debouncedIncrement()
    debouncedIncrement()

    // 在 delay 时间内取消 debouncedIncrement 函数的调用
    debouncedIncrement.cancel()

    // 等待 1500 毫秒
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 由于我们取消了 debouncedIncrement 函数的调用，所以即使我们等待了超过 delay 的时间，
    // counter 的值应该仍然为 0，因为 debouncedIncrement 函数没有被实际调用
    expect(counter).toBe(0)
  })
})
