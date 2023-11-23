import { describe, expect, it } from 'vitest'
import {
  convertBackslashToSlash,
  ensurePrefix,
  ensureSuffix,
  randomString,
  truncateString
} from '../src/utils/string'

describe.skip('randomString', () => {
  it('应生成指定长度的随机字符串', () => {
    const size = 10
    const result = randomString(size)
    expect(result.length).toBe(size)
  })

  it('应使用指定的字母表生成随机字符串', () => {
    const size = 10
    const alphabet = 'abc'
    const result = randomString(size, alphabet)
    expect(result).toMatch(new RegExp(`^[${alphabet}]{${size}}$`))
  })
})

describe.skip('convertBackslashToSlash', () => {
  it('应将字符串中的反斜杠转换为正斜杠', () => {
    const str = 'C:\\Users\\Username\\Documents'
    const result = convertBackslashToSlash(str)
    expect(result).toBe('C:/Users/Username/Documents')
  })
})

describe.skip('ensurePrefix', () => {
  it('应确保字符串以指定的前缀开头', () => {
    const str = 'world'
    const prefix = 'hello '
    const result = ensurePrefix(str, prefix)
    expect(result).toBe('hello world')
  })

  it('如果字符串已经以指定的前缀开头，则不应修改字符串', () => {
    const str = 'hello world'
    const prefix = 'hello '
    const result = ensurePrefix(str, prefix)
    expect(result).toBe(str)
  })
})

describe.skip('ensureSuffix', () => {
  it('应确保字符串以指定的后缀结尾', () => {
    const str = 'hello'
    const suffix = ' world'
    const result = ensureSuffix(str, suffix)
    expect(result).toBe('hello world')
  })

  it('如果字符串已经以指定的后缀结尾，则不应修改字符串', () => {
    const str = 'hello world'
    const suffix = ' world'
    const result = ensureSuffix(str, suffix)
    expect(result).toBe(str)
  })
})

describe.skip('truncateString', () => {
  it('应将字符串截断到指定的长度，并在末尾添加省略号', () => {
    const str = 'Lorem ipsum dolor sit amet'
    const length = 10
    const result = truncateString(str, length)
    expect(result).toBe('Lorem ipsu...')
  })

  it('如果字符串长度小于指定的长度，则不应修改字符串', () => {
    const str = 'Hello'
    const length = 10
    const result = truncateString(str, length)
    expect(result).toBe(str)
  })
})
