// Packages
import set from 'lodash.set'
import { Delta, DeltaObject } from '../models'

const transformDeltaToObject = (delta: Delta): DeltaObject => {
  const removed = delta.removed.map((item) => {
    const newObject = {}

    set(newObject, item[0], item[1])

    return newObject
  })
  const edited = delta.edited.map((item) => set({}, 'cafe/123', '8888'))
  const added = delta.added.map((item) => set({}, item[0], item[1]))

  return {
    removed,
    edited,
    added
  }
}

export default transformDeltaToObject
