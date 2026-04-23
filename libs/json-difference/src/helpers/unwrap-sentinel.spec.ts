// Packages
import { unwrapSentinel, OBJECT_SENTINEL, ARRAY_SENTINEL } from './unwrap-sentinel'

describe('unwrapSentinel helper', () => {
  test('Should return an empty object when value is the object sentinel', () => {
    const result = unwrapSentinel(OBJECT_SENTINEL)

    expect(result).toEqual({})
  })

  test('Should return an empty array when value is the array sentinel', () => {
    const result = unwrapSentinel(ARRAY_SENTINEL)

    expect(result).toEqual([])
  })

  test('Should return the original value when it is not a sentinel', () => {
    expect(unwrapSentinel('coffee')).toBe('coffee')
    expect(unwrapSentinel(42)).toBe(42)
    expect(unwrapSentinel(null)).toBe(null)
    expect(unwrapSentinel(undefined)).toBe(undefined)
    expect(unwrapSentinel(true)).toBe(true)
  })

  test('Should not match strings that only look like sentinels', () => {
    expect(unwrapSentinel('{}')).toBe('{}')
    expect(unwrapSentinel('[]')).toBe('[]')
    expect(unwrapSentinel('@{}  ')).toBe('@{}  ')
  })

  test('Should return the same reference for non-sentinel objects', () => {
    const obj = { foo: 'bar' }
    const arr = [1, 2, 3]

    expect(unwrapSentinel(obj)).toBe(obj)
    expect(unwrapSentinel(arr)).toBe(arr)
  })
})
