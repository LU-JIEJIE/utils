/**
 * 判断指定数字是否在指定范围内
 */
export function inRange(num: number, min: number, max: number) {
  return num >= min && num <= max
}

/**
 * 生成指定范围内的随机整数
 */
export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 将一个数字限制在最小值和最大值之间
 */
export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max)
}

/**
 * 适用于所有类型的toString方法
 */
export function toString(value: any) {
  return Object.prototype.toString.call(value)
}

/**
 * 节流函数的执行。特别适用于像resize和scroll这样的事件处理函数的执行频率限制。
 *
 * @param delay - 一个大于等于0的毫秒延迟。对于事件回调，大约100或250（甚至更高）的值最有用。
 * @param callback - 延迟毫秒后执行的函数。`this`上下文和所有参数都按原样传递给`callback`，当节流函数执行时。
 * @param options - 一个配置选项的对象。
 * @param options.noTrailing - 可选，默认为false。如果noTrailing为true，`callback`将只在节流函数被调用时每`delay`毫秒执行一次。如果noTrailing为false或未指定，`callback`将在最后一次节流函数调用后再执行一次。（在节流函数未被调用`delay`毫秒后，内部计数器将重置）
 * @param options.noLeading - 可选，默认为false。如果noLeading为false，第一次节流函数调用将立即执行`callback`。如果noLeading为true，将跳过第一次`callback`执行。应注意，如果noLeading = true和noTrailing = true，`callback`将永远不会执行。
 * @param options.debounceMode - 如果`debounceMode`为true（在开始时），安排`clear`在`delay`毫秒后执行。如果`debounceMode`为false（在结束时），安排`callback`在`delay`毫秒后执行。
 *
 * @returns 一个新的节流函数。
 */
interface ThrottleOrDebounceReturn {
  (...args: any[]): void
  cancel: (options?: { upcomingOnly?: boolean }) => void
}
export function throttle(delay: number, callback: Function, options?: {
  noTrailing?: boolean
  noLeading?: boolean
  debounceMode?: boolean
}): ThrottleOrDebounceReturn {
  const {
    noTrailing = false,
    noLeading = false,
    debounceMode = undefined
  } = options || {}

  let timeoutID: NodeJS.Timeout | undefined
  let cancelled = false
  let lastExec = 0

  // 清除现有的timeout
  function clearExistingTimeout() {
    if (timeoutID)
      clearTimeout(timeoutID)
  }

  // Function to cancel next exec
  function cancel(options?: { upcomingOnly?: boolean }) {
    const { upcomingOnly = false } = options || {}
    clearExistingTimeout()
    cancelled = !upcomingOnly
  }

  // 取消下一次执行的函数
  function wrapper(this: any, ...args: any[]): void {
    const elapsed = Date.now() - lastExec

    if (cancelled)
      return

    const exec = () => {
      lastExec = Date.now()
      callback.apply(this, args)
    }

    function clear() {
      timeoutID = undefined
    }

    if (!noLeading && debounceMode && !timeoutID)
      exec()

    clearExistingTimeout()

    if (debounceMode === undefined && elapsed > delay) {
      if (noLeading) {
        lastExec = Date.now()
        if (!noTrailing)
          timeoutID = setTimeout(debounceMode ? clear : exec, delay)
      }
      else {
        exec()
      }
    }
    else if (noTrailing !== true) {
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      )
    }
  }
  wrapper.cancel = cancel

  return wrapper
}

/**
 * 防抖函数执行。与节流不同，防抖保证函数只执行一次，要么在一系列调用的开始，要么在结束。
 *
 * @param delay - 零或更大的延迟（毫秒）。对于事件回调，大约100或250（甚至更高）的值最有用。
 * @param callback - 延迟毫秒后执行的函数。`this` 上下文和所有参数都会原样传递给执行的防抖函数。
 * @param options - 配置选项的对象。
 * @param options.atBegin - 可选，默认为 false。如果 atBegin 为 false 或未指定，回调函数只会在最后一次防抖函数调用后的 `delay` 毫秒后执行。
 *                            如果 atBegin 为 true，回调函数只会在第一次防抖函数调用时执行。
 *                            （在节流函数没有被调用的 `delay` 毫秒后，内部计数器会重置）。
 *
 * @returns 一个新的防抖函数。
 */
export function debounce(delay: number, callback: Function, options?: { atBegin?: boolean }): ThrottleOrDebounceReturn {
  const { atBegin = false } = options || {}
  return throttle(delay, callback, { debounceMode: atBegin !== false })
}
