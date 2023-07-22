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

      if (oldStructPaths[key] === newStructPaths[key]) {
        continue
      }

      if (oldStructPaths[key] === '@{}' || oldStructPaths[key] === '@[]') {
        const newStructValue = newStructPaths[key] === '@{}' ? {} : newStructPaths[key] === '@[]' ? [] : newStructPaths[key]

        if (oldStructPaths[key] === '@{}') {
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
