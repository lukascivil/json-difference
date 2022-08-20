// Models
import { Delta } from '../models/jsondiffer.model'
import { addDynamicProperty } from './add-dynamic-property'
import { unset } from 'lodash'

export const applyDeltaDiff = (struct: any, delta: Delta): any => {
  let struct1 = struct

  // Remove added properties
  delta.removed.forEach((el) => {
    const cafe = el[0].replaceAll('\\/.*?\\[]', (matched) => {
      console.log('entrei')
      const value = matched.replaceAll('/', '').replaceAll('[]', '')

      return `[${value}]`
    })

    console.log({ el, cafe })
    // struct1 = unset(struct, el[0])
  })

  // Add removed properties
  // delta.removed.forEach((el) => {
  //   struct1 = addDynamicProperty(struct, el)
  // })

  // // Undo edited properties
  // delta.edited.forEach((el) => {
  //   struct1 = addDynamicProperty(struct, [el[0], el[1]])
  // })

  return struct1
}
