// Models
import { Delta } from '../models/jsondiffer.model'
import unset from 'lodash/unset'
import get from 'lodash/get'
import set from 'lodash/set'
import setWith from 'lodash/setWith'
import isEmpty from 'lodash/isEmpty'
import toPath from 'lodash/toPath'

export const applyDeltaDiff = (struct: any, delta: Delta): any => {
  const struct1 = JSON.parse(JSON.stringify(struct))

  // Remove added properties
  delta.added.forEach((el) => {
    unset(struct1, el[0])
  })

  // Add removed properties
  delta.removed.forEach((el) => {
    const parentPartialPaths = toPath(el[0])

    parentPartialPaths.splice(-1)

    const parentValue = get(struct1, parentPartialPaths)

    if (typeof parentValue === 'object' && isEmpty(parentValue)) {
      unset(struct1, parentPartialPaths)
    }

    setWith(struct1, el[0], el[1], (element) => {
      const isArrayChild = el[0].split('.').pop()

      if (isArrayChild && isArrayChild.includes('[')) {
        return []
      }

      return element || {}
    })
  })

  // Undo edited properties
  delta.edited.forEach((el) => {
    set(struct1, el[0], el[1])
  })

  return struct1
}
