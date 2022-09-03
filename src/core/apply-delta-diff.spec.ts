// Packages
import { getDiff } from '.'

// Models
import { applyDeltaDiff } from './apply-delta-diff'

describe('ApplyDeltaDiff function', () => {
  test('Should resolve removed properties', () => {
    const struct1 = { '1': { '2': 7 } }
    const struct2 = { '1': {} }

    const delta = getDiff(struct1, struct2, true)
    const newStruct = applyDeltaDiff(struct2, delta)

    expect(newStruct).toEqual(struct1)
  })

  test('Should resolve added properties', () => {
    const struct1 = { '1': { '2': 7 } }
    const struct2 = { '1': { '2': 7, '3': 8 } }

    const delta = getDiff(struct1, struct2, true)
    const newStruct = applyDeltaDiff(struct2, delta)

    expect(newStruct).toEqual(struct1)
  })

  test('Should resolve edited properties', () => {
    const struct1 = { '1': { '2': 7 } }
    const struct2 = { '1': { '2': 8 } }

    const delta = getDiff(struct1, struct2, true)
    const newStruct = applyDeltaDiff(struct2, delta)

    expect(newStruct).toEqual(struct1)
  })

  test('Should return the difference between two basic structures with resolved added, removed and edited', () => {
    const struct1 = { '1': { '2': 7, '3': { '4': 6 } } }
    const struct2 = { '1': { '3': { '4': 5 }, '7': 8 } }

    const delta = getDiff(struct1, struct2, true)
    const newStruct = applyDeltaDiff(struct2, delta)

    expect(newStruct).toEqual(struct1)
  })

  test('Should resolve with complex struct', () => {
    const struct1 = { '0': [3], '2': null }
    const struct2 = { '0': { '0': 1 }, 1: '' }

    const delta = getDiff(struct1, struct2, true)
    const newStruct = applyDeltaDiff(struct2, delta)

    expect(newStruct).toEqual(struct1)
  })
})
