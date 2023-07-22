// Models
import { PathsDiff, StructPaths } from '../models/jsondiffer.model'

export const getPathsDiff = (oldStructPaths: StructPaths, newStructPaths: StructPaths): Array<PathsDiff> => {
  const diff: Array<PathsDiff> = []
  let index = 0

  for (const key in oldStructPaths) {
    if (!(key in newStructPaths)) {
      const cafe = oldStructPaths[key] === '@{}' ? {} : oldStructPaths[key] === '@[]' ? [] : oldStructPaths[key]

      diff[index] = [key, cafe]

      index++
    }
  }

  return diff
}
