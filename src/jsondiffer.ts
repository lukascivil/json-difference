import { IDelta, EditedPaths, IStructPaths, IPathsDiff } from './models/jsondiffer.model';

export class JsonDiffer {
  public getDiff(oldStruct: any, newStruct: any): IDelta {
    const delta: IDelta = {
      new: {},
      removed: {},
      edited: []
    };
    const oldStructPaths = this.getStructPaths(oldStruct);
    const newStructPaths = this.getStructPaths(newStruct);

    // A-B
    delta.removed = this.getPathsDiff(oldStructPaths, newStructPaths);
    // B-A
    delta.new = this.getPathsDiff(newStructPaths, oldStructPaths);
    // a->b
    delta.edited = this.getEditedPaths(oldStructPaths, newStructPaths);

    return delta;
  }

  private getStructPaths(struct: any, paths: IStructPaths = {}, currentPath = ''): IStructPaths {
    for (const key of Object.keys(struct)) {
      const path = currentPath !== '' ? `${currentPath}/${key}` : key;

      if (typeof struct[key] === 'object') {
        this.getStructPaths(struct[key], paths, path);
      } else {
        paths[path] = struct[key];
      }
    }

    return paths;
  }

  // Difference by key
  private getPathsDiff(oldStructPaths: IStructPaths, newStructPaths: IStructPaths): IPathsDiff {
    const diff: IPathsDiff = {};

    for (const key in oldStructPaths) {
      if (!(key in newStructPaths)) {
        diff[key] = oldStructPaths[key];
      }
    }

    return diff;
  }

  // Difference by value
  private getEditedPaths(oldStructPaths: IStructPaths, newStructPaths: IStructPaths): EditedPaths {
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
  }
}
