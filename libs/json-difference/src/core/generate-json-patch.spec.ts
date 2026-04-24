// Packages
import { readFileSync } from 'fs'
import { join } from 'path'
import { getDiff } from '.'

// Models
import { JsonPatch } from '../models/json-difference.model'
import { generateJsonPatch } from './generate-json-patch'

const FIXTURE_DIR = join(__dirname, '..', '..', 'fixture')
const loadFixture = (name: string): any => JSON.parse(readFileSync(join(FIXTURE_DIR, name), 'utf8'))

describe('GenerateJsonPatch function', () => {
  test('Should generate JSON Patch operations with nested array/object swap', () => {
    const struct1 = { '0': [{ '0': 1 }] }
    const struct2 = { '0': { '0': [1] } }
    const expectedResult: Array<JsonPatch> = [
      { op: 'remove', path: '/0/0/0' },
      { op: 'remove', path: '/0/0' },
      { op: 'replace', path: '/0', value: {} },
      { op: 'add', path: '/0/0', value: [] },
      { op: 'add', path: '/0/0/0', value: 1 }
    ]
    const delta = getDiff(struct1, struct2)
    const result = generateJsonPatch(delta)

    expect(result).toEqual(expectedResult)
  })

  test('Should generate JSON Patch operations with flat add/remove/replace', () => {
    const struct1 = {
      baz: 'qux',
      foo: 'bar'
    }
    const struct2 = {
      baz: 'boo',
      hello: ['world']
    }
    const expectedResult: Array<JsonPatch> = [
      { op: 'remove', path: '/foo' },
      { op: 'replace', path: '/baz', value: 'boo' },
      { op: 'add', path: '/hello', value: [] },
      { op: 'add', path: '/hello/0', value: 'world' }
    ]
    const delta = getDiff(struct1, struct2)
    const result = generateJsonPatch(delta)

    expect(result).toEqual(expectedResult)
  })

  test('Should emit a replace at the root pointer when the top-level type changes', () => {
    const struct1 = [] as any
    const struct2 = {}
    const expectedResult: Array<JsonPatch> = [{ op: 'replace', path: '', value: {} }]
    const delta = getDiff(struct1, struct2)
    const result = generateJsonPatch(delta)

    expect(result).toEqual(expectedResult)
  })

  test('Should return an empty array when the delta is empty', () => {
    const result = generateJsonPatch({ added: [], removed: [], edited: [] })

    expect(result).toEqual([])
  })

  test('Should remove the deepest paths first', () => {
    const struct1 = { a: { b: { c: 1 } } }
    const struct2 = { a: {} }
    const expectedResult: Array<JsonPatch> = [
      { op: 'remove', path: '/a/b/c' },
      { op: 'remove', path: '/a/b' }
    ]
    const delta = getDiff(struct1, struct2)
    const result = generateJsonPatch(delta)

    expect(result).toEqual(expectedResult)
  })

  /**
   * Integration tests covering the large stress fixtures. Patches from these
   * deltas contain hundreds of ops — structural invariants are asserted
   * instead of concrete values.
   */
  describe('with fixture files', () => {
    const oldJson = loadFixture('oldJson.json')
    const newJson = loadFixture('newJson.json')

    test('Should generate the full JSON Patch that transforms oldJson into newJson', () => {
      const expectedResult: Array<JsonPatch> = loadFixture('jsonPatch.json')

      const delta = getDiff(oldJson, newJson)
      const result = generateJsonPatch(delta)

      expect(result).toEqual(expectedResult)
    })
  })
})
