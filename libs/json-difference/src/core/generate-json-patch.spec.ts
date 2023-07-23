// Packages
import { getDiff } from '.'

// Models
import { JsonPatch } from '../models/jsondiffer.model'
import { generateJsonPatch } from './generate-json-patch'

describe('GenerateJsonPatch function', () => {
  test('Should return the difference between two basic structures', () => {
    const struct1 = { '0': [{ '0': 1 }] }
    const struct2 = { '0': { '0': [1] } }
    const expectedResult: Array<JsonPatch> = [
      { op: 'remove', path: '0/0' },
      { op: 'remove', path: '0/0/0[]' },
      { op: 'replace', path: '0', value: [] },
      { op: 'add', path: '0/0[]', value: {} },
      { op: 'add', path: '0/0[]/0', value: 1 }
    ]
    const delta = getDiff(struct1, struct2)
    const result = generateJsonPatch(delta)

    expect(result).toEqual(expectedResult)
  })

  test('Should return the difference between two basic structures', () => {
    const struct1 = {
      baz: 'qux',
      foo: 'bar'
    }
    const struct2 = {
      baz: 'boo',
      hello: ['world']
    }
    const expectedResult: Array<JsonPatch> = [
      {
        op: 'remove',
        path: 'hello'
      },
      {
        op: 'remove',
        path: 'hello/0[]'
      },
      {
        op: 'replace',
        path: 'baz',
        value: 'qux'
      },
      {
        op: 'add',
        path: 'foo',
        value: 'bar'
      }
    ]
    const delta = getDiff(struct1, struct2)
    const result = generateJsonPatch(delta)

    expect(result).toEqual(expectedResult)
  })
})
