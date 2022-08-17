// Packages
import { getEditedPaths } from './get-edited-paths'
import { getPathsDiff } from './get-paths-diff'
import { getStructPaths } from './get-struct-paths'

// Models
import { Delta } from '../models/jsondiffer.model'

export const getDiff = (oldStruct: Record<string, any>, newStruct: Record<string, any>): Delta => {
  const delta: Delta = {
    added: [],
    removed: [],
    edited: []
  }
  const oldStructPaths = getStructPaths(oldStruct)
  const newStructPaths = getStructPaths(newStruct)

  // A-B
  delta.removed = getPathsDiff(oldStructPaths, newStructPaths)

  // B-A
  delta.added = getPathsDiff(newStructPaths, oldStructPaths)

  // a->b
  delta.edited = getEditedPaths(oldStructPaths, newStructPaths)

  return delta
}
