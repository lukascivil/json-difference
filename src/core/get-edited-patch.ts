// Models
import { EditedPaths, IStructPaths } from '../models/jsondiffer.model';

export const getEditedPaths = (oldStructPaths: IStructPaths, newStructPaths: IStructPaths): EditedPaths => {
  const diffs: EditedPaths = [];
  let diff: any = {};

  for (const key in oldStructPaths) {
    if (newStructPaths.hasOwnProperty(key)) {
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
