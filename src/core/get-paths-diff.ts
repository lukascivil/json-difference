// Models
import { IPathsDiff, IStructPaths } from '../models/jsondiffer.model';

export const getPathsDiff = (oldStructPaths: IStructPaths, newStructPaths: IStructPaths): IPathsDiff => {
  const diff: IPathsDiff = {};

  for (const key in oldStructPaths) {
    if (!(key in newStructPaths)) {
      diff[key] = oldStructPaths[key];
    }
  }

  return diff;
};
