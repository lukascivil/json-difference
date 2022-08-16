// Models
import { EditedPath, StructPaths } from '../models/jsondiffer.model';

export const getEditedPaths = (oldStructPaths: StructPaths, newStructPaths: StructPaths): Array<EditedPath> => {
  const diffs: Array<EditedPath> = [];
  let diff: any = {};

  for (const key in oldStructPaths) {
    if (newStructPaths.hasOwnProperty(key)) {
      if (
        typeof oldStructPaths[key] === 'object' &&
        typeof newStructPaths[key] === 'object' &&
        JSON.stringify(oldStructPaths[key]) === JSON.stringify(newStructPaths[key])
      ) {
        continue;
      }

      if (oldStructPaths[key] !== newStructPaths[key]) {
        diff = {
          [key]: {
            oldValue: oldStructPaths[key],
            newValue: newStructPaths[key]
          }
        };

        diffs.push(diff);
      }
    }
  }

  return diffs;
};
