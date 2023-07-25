import { getStructPaths } from '.'

describe('GetStructPaths function', () => {
  test('Should return all paths from a basic structure', () => {
    const oldStruct = { 1: { 2: 7, 3: { 4: 6 } } }
    const expectedResult = { '': '@{}', '1': '@{}', '1/2': 7, '1/3': '@{}', '1/3/4': 6 }

    const result = getStructPaths(oldStruct)

    expect(result).toEqual(expectedResult)
  })

  test('Should return path for root []', () => {
    const oldStruct = [] as any
    const expectedResult = { '': '@[]' }

    const result = getStructPaths(oldStruct)

    expect(result).toEqual(expectedResult)
  })

  test('Should return path for root {}', () => {
    const oldStruct = {} as any
    const expectedResult = { '': '@{}' }

    const result = getStructPaths(oldStruct)

    expect(result).toEqual(expectedResult)
  })

  test('Should return all paths containing Array property', () => {
    const oldStruct = { a: 1, b: [{ c1: [{ c3: { c5: [1, 2, { c6: 3 }] } }, { c4: 6 }] }, { c2: 2 }] }
    const expectedResult = {
      '': '@{}',
      a: 1,
      b: '@[]',
      'b/0[]': '@{}',
      'b/0[]/c1': '@[]',
      'b/0[]/c1/0[]': '@{}',
      'b/0[]/c1/0[]/c3': '@{}',
      'b/0[]/c1/0[]/c3/c5': '@[]',
      'b/0[]/c1/0[]/c3/c5/0[]': 1,
      'b/0[]/c1/0[]/c3/c5/1[]': 2,
      'b/0[]/c1/0[]/c3/c5/2[]': '@{}',
      'b/0[]/c1/0[]/c3/c5/2[]/c6': 3,
      'b/0[]/c1/1[]': '@{}',
      'b/0[]/c1/1[]/c4': 6,
      'b/1[]': '@{}',
      'b/1[]/c2': 2
    }
    const expectedLodashLikeResult = {
      '': '@{}',
      a: 1,
      b: '@[]',
      'b[0]': '@{}',
      'b[0].c1': '@[]',
      'b[0].c1[0]': '@{}',
      'b[0].c1[0].c3': '@{}',
      'b[0].c1[0].c3.c5': '@[]',
      'b[0].c1[0].c3.c5[0]': 1,
      'b[0].c1[0].c3.c5[1]': 2,
      'b[0].c1[0].c3.c5[2]': '@{}',
      'b[0].c1[0].c3.c5[2].c6': 3,
      'b[0].c1[1]': '@{}',
      'b[0].c1[1].c4': 6,
      'b[1]': '@{}',
      'b[1].c2': 2
    }

    const result = getStructPaths(oldStruct)
    const lodashLikeResult = getStructPaths(oldStruct, true)

    expect(result).toEqual(expectedResult)
    expect(lodashLikeResult).toEqual(expectedLodashLikeResult)
  })

  test('Should return paths when the values are objects', () => {
    const oldStruct = { a: [], b: {} }
    const expectedResult = { '': '@{}', a: [], b: {} }
    const expectedLodashLikeResult = { '': '@{}', a: [], b: {} }

    const result = getStructPaths(oldStruct)
    const lodashLikeResult = getStructPaths(oldStruct, true)

    expect(result).toEqual(expectedResult)
    expect(lodashLikeResult).toEqual(expectedLodashLikeResult)
  })

  test('Should return different paths when containing object and array with same key value at root', () => {
    const oldStruct = { '0': 0 }
    const newStruct = [0]
    const expectedOldStructPaths = { '': '@{}', '0': 0 }
    const expectedOldStructLodashLikePaths = { '': '@{}', '0': 0 }
    const expectedNewStructPaths = { '': '@[]', '0[]': 0 }
    const expectedNewStructLodashLikePaths = { '': '@[]', '[0]': 0 }

    const oldStructPaths = getStructPaths(oldStruct)
    const newStructPaths = getStructPaths(newStruct)
    const oldStructLodashLikePaths = getStructPaths(oldStruct, true)
    const newStructLodashLikePaths = getStructPaths(newStruct, true)

    expect(oldStructPaths).toEqual(expectedOldStructPaths)
    expect(newStructPaths).toEqual(expectedNewStructPaths)
    expect(oldStructLodashLikePaths).toEqual(expectedOldStructLodashLikePaths)
    expect(newStructLodashLikePaths).toEqual(expectedNewStructLodashLikePaths)
  })

  test('Should return different paths when containing object and array with same key value', () => {
    const oldStruct = { '0': [{ '0': 1 }] }
    const newStruct = { '0': { '0': [1] } }
    const expectedOldStructPaths = {
      '': '@{}',
      '0': '@[]',
      '0/0[]': '@{}',
      '0/0[]/0': 1
    }
    const expectedOldStructLodashLikePaths = {
      '': '@{}',
      '0': '@[]',
      '0[0]': '@{}',
      '0[0].0': 1
    }
    const expectedNewStructPaths = {
      '': '@{}',
      '0': '@{}',
      '0/0': '@[]',
      '0/0/0[]': 1
    }
    const expectedNewStructLodashLikePaths = {
      '': '@{}',
      '0': '@{}',
      '0.0': '@[]',
      '0.0[0]': 1
    }

    const oldStructPaths = getStructPaths(oldStruct)
    const newStructPaths = getStructPaths(newStruct)
    const oldStructLodashLikePaths = getStructPaths(oldStruct, true)
    const newStructLodashLikePaths = getStructPaths(newStruct, true)

    expect(oldStructPaths).toEqual(expectedOldStructPaths)
    expect(newStructPaths).toEqual(expectedNewStructPaths)
    expect(oldStructLodashLikePaths).toEqual(expectedOldStructLodashLikePaths)
    expect(newStructLodashLikePaths).toEqual(expectedNewStructLodashLikePaths)
  })
})
