/**
 * 判断一个键是否是对象的键
 */
export function isKeyOf<T extends object>(obj: T, key: string | number | symbol): key is keyof T {
  return key in obj
}

/**
 * Typescript类型严格的Object.keys
 */
export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<keyof T>
}

/**
 * Typescript类型严格的Object.entries
 */
export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}
