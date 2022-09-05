// Models
import { Delta } from '../models/jsondiffer.model'
import unset from 'lodash/unset'
import get from 'lodash/get'
import set from 'lodash/set'
import setWith from 'lodash/setWith'
import isEmpty from 'lodash/isEmpty'
import toPath from 'lodash/toPath'
import { update, omitBy, compact } from 'lodash'

const mountRequiredPaths = (value: string): Array<[string, 'ArrayValue' | 'ObjectValue', string]> => {
  const pathsByObject = value.split('.')

  const cafe = pathsByObject.reduce((prev, curr) => {
    const cafe = curr.split('[').map((el) => (el.includes(']') ? `[${el}` : el))

    return prev.concat(cafe)
  }, [] as Array<string>)

  return cafe.map((value, index, array) => {
    const hasToAnalyzeNext = Boolean(array[index + 1])

    if (hasToAnalyzeNext) {
      const nextType = array[index + 1].includes(']') ? 'ArrayValue' : 'ObjectValue'

      return [value.replace(']', '').replace('[', ''), nextType, value]
    }

    return [value, 'ObjectValue', value]
  })
}

const fazAmagica = (object: any, path: string) => {
  const parentPath = path.slice(0, path.lastIndexOf('.'))

  unset(object, path)
  update(object, parentPath, compact)
}

export const applyDeltaDiff = (struct: any, delta: Delta): any => {
  let struct1 = JSON.parse(JSON.stringify(struct))

  // Remove added properties
  delta.added.forEach((el) => {
    console.log({ shouldRemove: el[0] })
    unset(struct1, el[0])

    const parentPath = mountRequiredPaths(el[0])

    console.log({ parentPath })

    if (parentPath[parentPath.length - 2][1] === 'ArrayValue') {
      const newParentPath = parentPath.map((el) => el[0])

      newParentPath.pop()

      update(struct1, newParentPath, compact)
    }
    // fazAmagica(struct1, el[0])
    // struct1 = omitBy(struct1, (value, key) => {
    //   console.log({ value, key })
    // })

    const parentPartialPaths = toPath(el[0])

    parentPartialPaths.splice(-1)

    const parentValue = get(struct1, parentPartialPaths)

    // console.log({ parentValue, parentPartialPaths })

    if (Array.isArray(parentValue)) {
    }

    // if ((typeof parentValue === 'object' && isEmpty(parentValue)) || JSON.stringify(parentValue) === JSON.stringify([null])) {
    //   // unset(struct1, parentPartialPaths)
    //   struct1 = omit(struct1, el[0])
    // }
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

      return element || []
    })
  })

  // Undo edited properties
  delta.edited.forEach((el) => {
    set(struct1, el[0], el[1])
  })

  return struct1
}
