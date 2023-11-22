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
 * 将一个数字限制在最小值和最大值之间。
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
