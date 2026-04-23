// Models
import { PathsDiff, StructPaths } from '../models/jsondiffer.model'
import { unwrapSentinel } from '../helpers/unwrap-sentinel'

/**
 * This method returns all paths whose leaf value has changed
 *
 * @param oldStructPaths Original paths to be investigated
 * @param newStructPaths Modified paths to be investigated
 * @returns returns an object with all edited paths
 *
 *
 * @example
 * const oldStruct = { 1: null, 2: "tea"  }
 * const newStruct = { 1: "coffee" }
 *
 * const result = getPathsDiff(oldStruct, newStruct)
 *
 *  console.log(result)
 *  // Output: ["2": "tea"]
 */
export const getPathsDiff = (oldStructPaths: StructPaths, newStructPaths: StructPaths): Array<PathsDiff> => {
  const diff: Array<PathsDiff> = []
  let index = 0

  for (const key in oldStructPaths) {
    if (!(key in newStructPaths)) {
      diff[index] = [key, unwrapSentinel(oldStructPaths[key])]

      index++
    }
  }

  return diff
}
