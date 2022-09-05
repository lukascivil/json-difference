// Models
import { Delta } from '../models/jsondiffer.model'
import unset from 'lodash/unset'
import get from 'lodash/get'
import set from 'lodash/set'
import setWith from 'lodash/setWith'
import isEmpty from 'lodash/isEmpty'
import toPath from 'lodash/toPath'

const mountRequiredPaths = (value: string): Array<[string, 'ArrayValue' | 'ObjectValue']> => {
  const pathsByObject = value.split('.')

  const cafe = pathsByObject.reduce((prev, curr) => {
    const cafe = curr.split('[')

    return prev.concat(cafe)
  }, [] as Array<string>)

  return cafe.map((value, index, array) => {
    const hasToAnalyzeNext = Boolean(array[index + 1])

    if (hasToAnalyzeNext) {
      const nextType = array[index + 1].includes(']') ? 'ArrayValue' : 'ObjectValue'

      return [value.replace(']', ''), nextType]
    }

    return [value, 'ObjectValue']
  })
}

export const applyDeltaDiff = (struct: any, delta: Delta): any => {
  const struct1 = JSON.parse(JSON.stringify(struct))

  // Remove added properties
  delta.added.forEach((el) => {
    unset(struct1, el[0])
  })

  // Add removed properties
  delta.removed.forEach((el) => {
    const parentPartialPaths = toPath(el[0])
    const parentPartialPaths2 = mountRequiredPaths(el[0])
    console.log({ parentPartialPaths2 })

    parentPartialPaths.splice(-1)

    const parentValue = get(struct1, parentPartialPaths)

    if (typeof parentValue === 'object' && isEmpty(parentValue)) {
      unset(struct1, parentPartialPaths)
    }

    setWith(struct1, el[0], el[1], (element, key, obj) => {
      const isObject = parentPartialPaths2.some((ele) => ele[0] === key && ele[1] === 'ObjectValue')

      console.log({ element, key, obj, isObject })

      if (isObject) {
        return element || {}
      }

      return []
    })
  })

  // Undo edited properties
  delta.edited.forEach((el) => {
    set(struct1, el[0], el[1])
  })

  return struct1
}
