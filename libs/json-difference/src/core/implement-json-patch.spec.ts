// Packages
import { readFileSync } from 'fs'
import { join } from 'path'
import { implementJsonPatch } from './implement-json-patch'

// Models
import { JsonPatch } from '../models/json-difference.model'

const FIXTURE_DIR = join(__dirname, '..', '..', 'fixture')
const loadFixture = (name: string): any => JSON.parse(readFileSync(join(FIXTURE_DIR, name), 'utf8'))

describe('ImplementJsonPatch function', () => {
  test('Should add a new property to an object', () => {
    const document = { a: 1 }
    const patch: Array<JsonPatch> = [{ op: 'add', path: '/b', value: 2 }]
    const expectedResult = { a: 1, b: 2 }

    const result = implementJsonPatch(document, patch)

    expect(result).toEqual(expectedResult)
  })

  test('Should remove a property from an object', () => {
    const document = { a: 1, b: 2 }
    const patch: Array<JsonPatch> = [{ op: 'remove', path: '/b' }]
    const expectedResult = { a: 1 }

    const result = implementJsonPatch(document, patch)

    expect(result).toEqual(expectedResult)
  })

  test('Should replace a property value', () => {
    const document = { a: 1 }
    const patch: Array<JsonPatch> = [{ op: 'replace', path: '/a', value: 99 }]
    const expectedResult = { a: 99 }

    const result = implementJsonPatch(document, patch)

    expect(result).toEqual(expectedResult)
  })

  test('Should insert into an array shifting subsequent elements', () => {
    const document = { arr: [1, 3] }
    const patch: Array<JsonPatch> = [{ op: 'add', path: '/arr/1', value: 2 }]
    const expectedResult = { arr: [1, 2, 3] }

    const result = implementJsonPatch(document, patch)

    expect(result).toEqual(expectedResult)
  })

  test('Should remove from an array shifting subsequent elements', () => {
    const document = { arr: [1, 2, 3] }
    const patch: Array<JsonPatch> = [{ op: 'remove', path: '/arr/1' }]
    const expectedResult = { arr: [1, 3] }

    const result = implementJsonPatch(document, patch)

    expect(result).toEqual(expectedResult)
  })

  test('Should replace an array element', () => {
    const document = { arr: [1, 2, 3] }
    const patch: Array<JsonPatch> = [{ op: 'replace', path: '/arr/1', value: 99 }]
    const expectedResult = { arr: [1, 99, 3] }

    const result = implementJsonPatch(document, patch)

    expect(result).toEqual(expectedResult)
  })

  test('Should replace the entire document when the path is empty', () => {
    const document = { a: 1 }
    const patch: Array<JsonPatch> = [{ op: 'replace', path: '', value: [1, 2, 3] }]
    const expectedResult = [1, 2, 3]

    const result = implementJsonPatch(document, patch)

    expect(result).toEqual(expectedResult)
  })

  test('Should return an unchanged document for an empty patch', () => {
    const document = { a: 1, b: [1, 2] }
    const expectedResult = { a: 1, b: [1, 2] }

    const result = implementJsonPatch(document, [])

    expect(result).toEqual(expectedResult)
  })

  test('Should not mutate the input document', () => {
    const document = { a: 1, arr: [1, 2] }
    const expectedResult = { a: 1, arr: [1, 2] }
    const patch: Array<JsonPatch> = [
      { op: 'add', path: '/b', value: 2 },
      { op: 'remove', path: '/arr/0' }
    ]

    implementJsonPatch(document, patch)

    expect(document).toEqual(expectedResult)
  })

  test('Should unescape "~1" to "/" and "~0" to "~" in pointer tokens', () => {
    const document = { 'a/b': 1, 'c~d': 2 }
    const patch: Array<JsonPatch> = [
      { op: 'replace', path: '/a~1b', value: 'updated' },
      { op: 'remove', path: '/c~0d' }
    ]
    const expectedResult = { 'a/b': 'updated' }

    const result = implementJsonPatch(document, patch)

    expect(result).toEqual(expectedResult)
  })

  test('Should apply a mixed patch (remove + replace + add) in order', () => {
    const document = { keep: 1, toReplace: 'old', toRemove: 'gone' }
    const patch: Array<JsonPatch> = [
      { op: 'remove', path: '/toRemove' },
      { op: 'replace', path: '/toReplace', value: 'new' },
      { op: 'add', path: '/added', value: [1, 2] }
    ]
    const expectedResult = { keep: 1, toReplace: 'new', added: [1, 2] }

    const result = implementJsonPatch(document, patch)

    expect(result).toEqual(expectedResult)
  })

  describe('with fixture files', () => {
    test('Should transform oldJson into newJson when applying the generated patch', () => {
      const oldJson = loadFixture('oldJson.json')
      const expectedResult = loadFixture('newJson.json')
      const patch: Array<JsonPatch> = loadFixture('jsonPatch.json')

      const result = implementJsonPatch(oldJson, patch)

      expect(result).toEqual(expectedResult)
    })
  })
})
