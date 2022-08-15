// Models
import { PathsDiff, StructPaths } from '../models/jsondiffer.model';

export const getPathsDiff = (oldStructPaths: StructPaths, newStructPaths: StructPaths): PathsDiff => {
  const diff: PathsDiff = {};

  for (const key in oldStructPaths) {
    if (!(key in newStructPaths)) {
      diff[key] = oldStructPaths[key];
    }
  }

  return diff;
};
