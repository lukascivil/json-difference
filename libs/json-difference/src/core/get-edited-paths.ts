// Models
import { EditedPath, StructPaths } from '../models/json-difference.model'
import { ARRAY_SENTINEL, OBJECT_SENTINEL, unwrapSentinel } from '../helpers/unwrap-sentinel'

/**
 * This method returns all paths whose leaf value has changed
 *
 * @param oldStructPaths Original paths to be investigated
 * @param newStructPaths Modified paths to be investigated
 * @returns returns an object with all edited paths
 *
 *
 * @example
 * const oldStruct = { 1: null  }
 * const newStruct = { 1: "coffee" }
 *
 * const result = getEditedPaths(oldStruct, newStruct)
 *
 *  // Output: [1, null ,"coffee"]
 *  console.log(result)
 */
export const getEditedPaths = (oldStructPaths: StructPaths, newStructPaths: StructPaths): Array<EditedPath> => {
  const diffs: Array<EditedPath> = []

  for (const key in oldStructPaths) {
    if (newStructPaths.hasOwnProperty(key)) {
      if (
        typeof oldStructPaths[key] === 'object' &&
        typeof newStructPaths[key] === 'object' &&
        JSON.stringify(oldStructPaths[key]) === JSON.stringify(newStructPaths[key])
      ) {
        continue
      }

      if (oldStructPaths[key] === newStructPaths[key]) {
        continue
      }

      if (oldStructPaths[key] === OBJECT_SENTINEL || oldStructPaths[key] === ARRAY_SENTINEL) {
        const newStructValue = unwrapSentinel(newStructPaths[key])

        if (oldStructPaths[key] === OBJECT_SENTINEL) {
          if ('{}' !== JSON.stringify(newStructPaths[key])) {
            diffs.push([key, {}, newStructValue])
          }
        } else {
          if ('[]' !== JSON.stringify(newStructPaths[key])) {
            diffs.push([key, [], newStructValue])
          }
        }
      } else {
        diffs.push([key, oldStructPaths[key], newStructPaths[key]])
      }
    }
  }

  return diffs
}
