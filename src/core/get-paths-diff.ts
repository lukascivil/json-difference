// Models
import { PathsDiff, StructPaths } from '../models/jsondiffer.model'

export const getPathsDiff = (oldStructPaths: StructPaths, newStructPaths: StructPaths): Array<PathsDiff> => {
  const diff: Array<PathsDiff> = []
  let index = 0

  for (const key in oldStructPaths) {
    if (!(key in newStructPaths)) {
      diff[index] = [key, oldStructPaths[key]]

      index++
    }
  }

  return diff
}
