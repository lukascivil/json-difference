// Models
import { EditedPath, StructPaths } from '../models/jsondiffer.model'

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

      if (oldStructPaths[key] !== newStructPaths[key]) {
        if (oldStructPaths[key] === '@parent-with-children-{}' || oldStructPaths[key] === '@parent-with-children-[]') {
          const cafe =
            newStructPaths[key] === '@parent-with-children-{}'
              ? {}
              : newStructPaths[key] === '@parent-with-children-[]'
              ? []
              : newStructPaths[key]

          if (oldStructPaths[key] === '@parent-with-children-{}') {
            if (JSON.stringify({}) !== JSON.stringify(newStructPaths[key])) {
              diffs.push([key, {}, cafe])
            }
          } else {
            if (JSON.stringify([]) !== JSON.stringify(newStructPaths[key])) {
              diffs.push([key, [], cafe])
            }
          }
        } else {
          diffs.push([key, oldStructPaths[key], newStructPaths[key]])
        }
      }
    }
  }

  return diffs
}
