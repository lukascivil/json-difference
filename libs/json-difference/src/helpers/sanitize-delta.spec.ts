// Packages
import sanitizeDelta from './sanitize-delta'

// Models
import { Delta } from '../models/json-difference.model'

describe('sanitizeDelta helper', () => {
  test.only('Should remove unnecessary @{}', () => {
    const delta: Delta = { edited: [['a', {}, '@{}']], added: [], removed: [] }
    const expectedResult: Delta = { edited: [], added: [], removed: [] }

    const result = sanitizeDelta(delta)

    expect(result).toEqual(expectedResult)
  })

  test.only('Should replace @{} with {}', () => {
    const delta: Delta = { edited: [['/', '', '@{}']], added: [], removed: [] }
    const expectedResult: Delta = { edited: [['/', '', {}]], added: [], removed: [] }

    const result = sanitizeDelta(delta)

    expect(result).toEqual(expectedResult)
  })

  test.only('Should replace @{} with {}', () => {
    const delta: Delta = { edited: [['/', '', '@[]']], added: [], removed: [] }
    const expectedResult: Delta = { edited: [['/', '', []]], added: [], removed: [] }

    const result = sanitizeDelta(delta)

    expect(result).toEqual(expectedResult)
  })
})
