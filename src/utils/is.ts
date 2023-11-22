import { toString } from './common'

export function isFunction(value: unknown): value is Function {
  return toString(value) === '[object Function]'
}

export function isString(value: unknown): value is string {
  return toString(value) === '[object String]'
}

export function isNumber(value: unknown): value is number {
  return toString(value) === '[object Number]'
}

export function isBoolean(value: unknown): value is boolean {
  return toString(value) === '[object Boolean]'
}

export function isArray(value: unknown): value is Array<any> {
  return toString(value) === '[object Array]'
}

export function isObject(value: unknown): value is object {
  return toString(value) === '[object Object]'
}

export function isNull(value: unknown): value is null {
  return toString(value) === '[object Null]'
}

export function isUndefined(value: unknown): value is undefined {
  return toString(value) === '[object Undefined]'
}

export function isSymbol(value: unknown): value is symbol {
  return toString(value) === '[object Symbol]'
}

export function isRegExp(value: unknown): value is RegExp {
  return toString(value) === '[object RegExp]'
}

export function isDate(value: unknown): value is Date {
  return toString(value) === '[object Date]'
}

export function isError(value: unknown): value is Error {
  return toString(value) === '[object Error]'
}

export function isPromise(value: unknown): value is Promise<any> {
  return toString(value) === '[object Promise]'
}
