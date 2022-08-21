// Models
import { Delta } from '../models/jsondiffer.model'
import { addDynamicProperty } from './add-dynamic-property'
import unset from 'lodash/unset'
import omit from 'lodash/omit'
import set from 'lodash/set'

export const applyDeltaDiff = (struct: any, delta: Delta): any => {
  let struct1 = struct

  // Remove added properties
  delta.added.forEach((el) => {
    // const cafe = el[0].replaceAll('\\/.*?\\[]', (matched) => {
    //   console.log('entrei')
    //   const value = matched.replaceAll('/', '').replaceAll('[]', '')

    //   return `[${value}]`
    // })

    console.log({ el })
    unset(struct1, el[0])
  })

  // Add removed properties
  // delta.removed.forEach((el) => {
  //   set(struct1, el[0], el[1])
  //   // struct1 = addDynamicProperty(struct, el)
  // })

  // Undo edited properties
  // delta.edited.forEach((el) => {
  //   set(struct1, el[0], el[1])
  //   // struct1 = addDynamicProperty(struct, [el[0], el[1]])
  // })

  return struct1
}
