// Packages
import { getEditedPaths } from './get-edited-paths'
import { getPathsDiff } from './get-paths-diff'
import { getStructPaths } from './get-struct-paths'

// Models
import { Delta, JsonDiffOptions } from '../models/jsondiffer.model'

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
 *  const original = { 1: null }
 *  const modified = { 1: "coffee" }
 *
 *  const result = getDiff(original, modified)
 */
export const getDiff = (oldStruct: Record<string, any>, newStruct: Record<string, any>, options?: JsonDiffOptions): Delta => {
  const { isLodashLike } = options ?? defaultOptions
  const delta: Delta = {
    added: [],
    removed: [],
    edited: []
  }
  const oldStructPaths = getStructPaths(oldStruct, isLodashLike)
  const newStructPaths = getStructPaths(newStruct, isLodashLike)

  // A-B
  delta.removed = getPathsDiff(oldStructPaths, newStructPaths)

  // B-A
  delta.added = getPathsDiff(newStructPaths, oldStructPaths)

  // a->b
  delta.edited = getEditedPaths(oldStructPaths, newStructPaths)

  return delta
}
