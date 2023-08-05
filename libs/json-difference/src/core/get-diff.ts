// Packages
import { getEditedPaths } from './get-edited-paths'
import { getPathsDiff } from './get-paths-diff'
import { getStructPaths } from './get-struct-paths'

// Models
import { Delta, JsonDiffOptions } from '../models/jsondiffer.model'
import sanitizeDelta from '../helpers/sanitize-delta'

const defaultOptions: JsonDiffOptions = {
  isLodashLike: false
}

/**
 * This method returns a delta object containing all the information needed to understand what happened during
 * the transition from the original object to the modified one.
 *
 * @param oldStruct Original structure to be investigated
 * @param newStruct Modified structure to be investigated
 * @param options Options for changing result behavior
 * @returns returns a JSON diference delta
 *
 *
 * @example
 *  const oldStruct = { 1: null }
 *  const newStruct = { 1: "coffee" }
 *
 *  const result = getDiff(oldStruct, newStruct)
 *
 *  // Output: {"edited": [["1", null, "coffee"]], added: [], removed: []}
 *  console.log(result)
 */
export const getDiff = (
  oldStruct: Record<string, any> | string,
  newStruct: Record<string, any> | string,
  options?: JsonDiffOptions
): Delta => {
  const { isLodashLike } = options ?? defaultOptions
  const delta: Delta = {
    added: [],
    removed: [],
    edited: []
  }
  const preparedOldStruct = typeof oldStruct === 'string' ? JSON.parse(oldStruct) : oldStruct
  const preparedNewStruct = typeof newStruct === 'string' ? JSON.parse(newStruct) : newStruct
  const oldStructPaths = getStructPaths(preparedOldStruct, isLodashLike)
  const newStructPaths = getStructPaths(preparedNewStruct, isLodashLike)

  // A-B
  delta.removed = getPathsDiff(oldStructPaths, newStructPaths)

  // B-A
  delta.added = getPathsDiff(newStructPaths, oldStructPaths)

  // a->b
  delta.edited = getEditedPaths(oldStructPaths, newStructPaths)

  // Sanitize Delta to remove unnecessary paths
  const sanitizedDelta = sanitizeDelta(delta)

  return sanitizedDelta
}
