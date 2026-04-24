// Packages
import { toJsonPointer } from './to-json-pointer'

describe('toJsonPointer helper', () => {
  test('Should return an empty string for the root sentinel', () => {
    expect(toJsonPointer('__root__')).toBe('')
  })

  test('Should convert a simple key', () => {
    expect(toJsonPointer('foo')).toBe('/foo')
  })

  test('Should convert a nested path', () => {
    expect(toJsonPointer('foo/bar/baz')).toBe('/foo/bar/baz')
  })

  test('Should strip the array index marker', () => {
    expect(toJsonPointer('0[]')).toBe('/0')
    expect(toJsonPointer('foo/0[]')).toBe('/foo/0')
    expect(toJsonPointer('foo/0[]/bar/1[]')).toBe('/foo/0/bar/1')
  })

  test('Should escape "~" in keys per RFC 6901', () => {
    expect(toJsonPointer('a~b')).toBe('/a~0b')
    expect(toJsonPointer('foo/a~b')).toBe('/foo/a~0b')
  })

  test('Should preserve empty keys', () => {
    expect(toJsonPointer('')).toBe('/')
    expect(toJsonPointer('/')).toBe('//')
    expect(toJsonPointer('/a/')).toBe('//a/')
  })
})
