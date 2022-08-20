// Packages
import { getDiff } from '.'

// Models
import { applyDeltaDiff } from './apply-delta-diff'

describe('ApplyDeltaDiff function', () => {
  // test('Should return the difference between two basic structures', () => {
  //   const struct1 = { 1: { 2: 7, 3: { 4: 6 } } }
  //   const struct2 = { 1: { 3: { 4: 5 } } }

  //   const delta = getDiff(struct1, struct2)
  //   const newStruct = applyDeltaDiff(struct2, delta)

  //   expect(newStruct).toEqual(struct1)
  // })

  test('Should klkkkk', () => {
    const struct1 = { '0': [1] }
    const struct2 = { '0': { '0': 1 } }

    const delta = getDiff(struct1, struct2)
    const newStruct = applyDeltaDiff(struct2, delta)

    expect(newStruct).toEqual(struct1)
  })
})
