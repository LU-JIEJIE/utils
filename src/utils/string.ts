import { randomInt } from './common'
import { isFunction, isObject } from './is'

/**
 * 生成随机字符串
 */
const nanoIdAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
export function randomString(size: number, alphabet: string = nanoIdAlphabet): string {
  let id = ''
  let i = size
  while (i--)
    id += alphabet[randomInt(0, alphabet.length - 1)]
  return id
}

/**
 * 将'\\'转换为'/'
 */
export function convertBackslashToSlash(str: string): string {
  return str.replace(/\\/g, '/')
}

/**
 *  确保字符串以指定前缀开头
 */
export function ensurePrefix(str: string, prefix: string): string {
  return str.startsWith(prefix) ? str : prefix + str
}

/**
 * 确保字符串以指定后缀结尾
 */
export function ensureSuffix(str: string, suffix: string): string {
  return str.endsWith(suffix) ? str : str + suffix
}

/**
 * 将字符串截断到指定的长度，并在末尾添加省略号
 */
export function truncateString(str: string, length: number, omission: string = '...'): string {
  if (str.length <= length)
    return str
  return `${str.slice(0, length)}${omission}`
}

/**
 * python like format
 */
export function format(str: string, ...args: (string | number)[]): string
export function format(str: string, argObject: Record<string, any>, placeholder?: string | ((key: string) => any)): string
export function format(str: string, ...args: any[]): string {
  if (isObject(args[0])) {
    const [argObject, placeholder] = args
    return str.replace(/{([\w\d]+)}/g, (_, key) => (argObject as Record<string, any>)[key] || (isFunction(placeholder) ? placeholder(key) : placeholder) || `{${key}}`)
  }
  else { return str.replace(/{(\d+)}/g, (_, key) => Number.isNaN(Number(key)) ? `{${key}}` : args[Number(key)] || `{${key}}`) }
}
