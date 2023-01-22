// Packages
import { getDiff } from '.'

// Models
import { Delta } from '../models/jsondiffer.model'

describe('GetDiff function', () => {
  test('Should return the difference between two basic structures', () => {
    const struct1 = { 1: { 2: 7, 3: { 4: 6 } } }
    const struct2 = { 1: { 3: { 4: 5 } } }
    const expectedResult: Delta = { edited: [['1/3/4', 6, 5]], added: [], removed: [['1/2', 7]] }
    const expectedLodashResult: Delta = { edited: [['1.3.4', 6, 5]], added: [], removed: [['1.2', 7]] }

    const result = getDiff(struct1, struct2)
    const lodashResult = getDiff(struct1, struct2, true)

    expect(result).toEqual(expectedResult)
    expect(lodashResult).toEqual(expectedLodashResult)
  })

  test('Should return the difference between two structures containing Array property', () => {
    const struct1 = { a: 1, b: [{ c1: 1 }, { c2: 2 }] }
    const struct2 = { a: 11, b: [{ c1: 1 }, { c2: 22 }] }
    const expectedResult: Delta = {
      edited: [
        ['a', 1, 11],
        ['b/1[]/c2', 2, 22]
      ],
      added: [],
      removed: []
    }
    const expectedLodashResult: Delta = {
      edited: [
        ['a', 1, 11],
        ['b[1].c2', 2, 22]
      ],
      added: [],
      removed: []
    }

    const result = getDiff(struct1, struct2)
    const lodashResult = getDiff(struct1, struct2, true)

    expect(result).toEqual(expectedResult)
    expect(lodashResult).toEqual(expectedLodashResult)
  })

  test('Should return the difference between two structures containing deep Array nodes', () => {
    const struct1 = { a: 1, b: [{ c1: [{ c3: { c5: [1, 2, { c6: 3 }] } }, { c4: 6 }] }, { c2: 2 }] }
    const struct2 = { a: 11, b: [{ c1: [{ c3: { c5: [1, 2, { c6: 4 }] } }, { c4: 6 }] }, { c2: 2 }] }
    const expectedResult: Delta = {
      edited: [
        ['a', 1, 11],
        ['b/0[]/c1/0[]/c3/c5/2[]/c6', 3, 4]
      ],
      added: [],
      removed: []
    }
    const expectedLodashResult: Delta = {
      edited: [
        ['a', 1, 11],
        ['b[0].c1[0].c3.c5[2].c6', 3, 4]
      ],
      added: [],
      removed: []
    }

    const result = getDiff(struct1, struct2)
    const lodashResult = getDiff(struct1, struct2, true)

    expect(result).toEqual(expectedResult)
    expect(lodashResult).toEqual(expectedLodashResult)
  })

  test('Should return the difference between two structures containing different node types', () => {
    const struct1 = { a: 1, b: { c1: 2 }, c: 3 }
    const struct2 = { a: '1', b: 2, c: true }
    const expectedResult: Delta = {
      edited: [
        ['a', 1, '1'],
        ['c', 3, true]
      ],
      added: [['b', 2]],
      removed: [['b/c1', 2]]
    }
    const expectedLodashResult: Delta = {
      edited: [
        ['a', 1, '1'],
        ['c', 3, true]
      ],
      added: [['b', 2]],
      removed: [['b.c1', 2]]
    }

    const result = getDiff(struct1, struct2)
    const lodashResult = getDiff(struct1, struct2, true)

    expect(result).toEqual(expectedResult)
    expect(expectedLodashResult).toEqual(lodashResult)
  })

  test('Should return no diff when the structs has nested equal structures', () => {
    const oldStruct = { a: [], b: {} }
    const newStruct = { a: [], b: {} }
    const expectedResult: Delta = {
      edited: [],
      added: [],
      removed: []
    }

    const result = getDiff(oldStruct, newStruct)
    const lodashResult = getDiff(oldStruct, newStruct, true)

    expect(result).toEqual(expectedResult)
    expect(lodashResult).toEqual(expectedResult)
  })

  test('Should compute the difference between structures with different object values', () => {
    const oldStruct = { a: [], b: {}, c: [], d: {} }
    const newStruct = { a: {}, b: [], c: false, d: 1 }
    const expectedResult: Delta = {
      edited: [
        ['a', [], {}],
        ['b', {}, []],
        ['c', [], false],
        ['d', {}, 1]
      ],
      added: [],
      removed: []
    }

    const result = getDiff(oldStruct, newStruct)
    const lodashResult = getDiff(oldStruct, newStruct, true)

    expect(result).toEqual(expectedResult)
    expect(lodashResult).toEqual(expectedResult)
  })

  test('Should return the difference between two structures containing array and object with same key value', () => {
    const struct1 = { '0': [{ '0': 1 }] }
    const struct2 = { '0': { '0': [1] } }
    const expectedResult: Delta = {
      edited: [],
      added: [['0/0/0[]', 1]],
      removed: [['0/0[]/0', 1]]
    }
    const expectedLodashResult: Delta = {
      edited: [],
      added: [['0.0[0]', 1]],
      removed: [['0[0].0', 1]]
    }

    const result = getDiff(struct1, struct2)
    const lodashResult = getDiff(struct1, struct2, true)

    expect(result).toEqual(expectedResult)
    expect(lodashResult).toEqual(expectedLodashResult)
  })

  test('Should return the difference between two structures containing null', () => {
    const struct1 = { 1: null }
    const struct2 = { 1: '', 2: null }
    const expectedResult: Delta = { edited: [['1', null, '']], added: [['2', null]], removed: [] }
    const expectedLodashResult: Delta = { edited: [['1', null, '']], added: [['2', null]], removed: [] }

    const result = getDiff(struct1, struct2)
    const lodashResult = getDiff(struct1, struct2, true)

    expect(result).toEqual(expectedResult)
    expect(lodashResult).toEqual(expectedLodashResult)
  })
})
