import { inRange, randomInt } from './common'

/**
 * 拍平数组
 */
export function flattenArray<T>(array: Array<T>): Array<T> {
  return array.flat(Number.POSITIVE_INFINITY) as Array<T>
}

/**
 * 数组去重
 */
export function unique<T>(array: readonly T[]): T[]

/**
 * 根据指定规则equalFn进行数组去重
 */
export function unique<T>(array: readonly T[], equalFn: (a: T, b: T) => boolean): T[]
export function unique<T>(array: readonly T[], equalFn?: (a: T, b: T) => boolean): T[] {
  if (!equalFn)
    return Array.from(new Set(array))

  const res: T[] = []
  for (const item of array) {
    if (res.findIndex(resItem => equalFn(item, resItem)) === -1)
      res.push(item)
  }
  return res
}

/**
 * 获取数组指定索引的值，负数表示从后往前
 */
export function at<T>(array: readonly T[], index: number): T | undefined {
  const len = array.length
  if (!len || index >= len || index < -len)
    return undefined
  return array[index >= 0 ? index : len + index]
}

/**
 * 移动数组元素
 */
export function move<T>(array: T[], from: number, to: number) {
  const len = array.length
  if (!len || inRange(from, 0, len) || inRange(to, 0, len) || from === to)
    return
  array.splice(to, 0, array.splice(from, 1)[0])
}

/**
 * 移除数组元素
 */
export function remove<T>(array: T[], item: T) {
  const index = array.indexOf(item)
  if (index !== -1)
    array.splice(index, 1)
}

/**
 * 对数组进行采样
 */
export function sample<T>(array: T[], size: number): T[] {
  const len = array.length

  if (size >= len)
    return array.slice()

  const sampled: T[] = []
  const arrayCopy: T[] = array.slice()

  while (sampled.length < size) {
    // const randomIndex = Math.floor(Math.random() * arrayCopy.length)
    const randomIndex = randomInt(0, len - 1)
    sampled.push(arrayCopy.splice(randomIndex, 1)[0])
  }
  return sampled
}

/**
 * 数组洗牌，会改变原数组
 */
export function shuffle<T>(array: T[]): T[] {
  const len = array.length
  for (let i = len - 1; i > 0; i--) {
    const randomIndex = randomInt(0, i)
    ;[array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }
  return array
}

/**
 * 生成一个从0到end的数组，步长为1，不包含end
 */
export function range(end: number): number[]
/**
 * 生成一个从start到end的数组，步长为step，不包含end
 */
export function range(start: number, end: number, step?: number): number[]
export function range(...args: any[]): number[] {
  const [start, end, step = 1] = args.length === 1 ? [0, args[0], 1] : args

  let cur = start
  const res: number[] = []
  if (step > 0) {
    while (cur < end) {
      res.push(cur)
      cur += step
    }
  }
  else {
    while (cur > end) {
      res.push(cur)
      cur += step
    }
  }

  return res
}
