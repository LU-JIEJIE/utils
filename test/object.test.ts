import { describe, expect, it } from 'vitest'
import { isKeyOf } from '../src/utils/object'

describe.skip('isKeyOf', () => {
  it('should work', () => {
    expect(isKeyOf({ a: 1, b: 2, c: 3 }, 'a')).toBeTruthy()
    expect(isKeyOf({ a: 1, b: 2, c: 3 }, 'd')).toBeFalsy()
    const s1 = Symbol(1)
    expect(isKeyOf({ [s1]: 1 }, s1)).toBeTruthy()
  })
})
