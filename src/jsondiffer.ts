import { IDelta, EditedPaths, StructPaths, PathsDiff } from './models/jsondiffer.model';

export class JsonDiffer {
  public getDiff(struct1: any, struct2: any): IDelta {
    const delta: IDelta = {
      new: {},
      removed: {},
      edited: []
    };
    const struct1_paths = this.getStructPaths(struct1);
    const struct2_paths = this.getStructPaths(struct2);

    // A-B
    delta.removed = this.getPathsDiff(struct1_paths, struct2_paths);
    // B-A
    delta.new = this.getPathsDiff(struct2_paths, struct1_paths);
    // a->b
    delta.edited = this.getEditedPaths(struct1_paths, struct2_paths);

    return delta;
  }

  private getStructPaths(struct: any, paths: any = [], currentpath = ''): StructPaths {
    for (const key in struct) {
      const path = currentpath !== '' ? currentpath + '/' + key : key;

      if (typeof struct[key] == 'object') {
        this.getStructPaths(struct[key], paths, path);
      } else {
        paths[path] = struct[key];
      }
    }

    return paths;
  }

  // Difference by key
  private getPathsDiff(struct1_paths: any, struct2_paths: any): PathsDiff {
    const diff: any = {};

    for (const key in struct1_paths) {
      if (!(key in struct2_paths)) {
        diff[key] = struct1_paths[key];
      }
    }

    return diff;
  }

  // Difference by value
  private getEditedPaths(struct1_paths: any, struct2_paths: any): EditedPaths {
    const diffs: any = [];
    let diff: any = {};

    for (const key in struct1_paths) {
      if (struct2_paths.hasOwnProperty(key)) {
        if (struct1_paths[key] !== struct2_paths[key]) {
          diff = {
            [key]: {
              oldValue: struct1_paths[key],
              newValue: struct2_paths[key]
            }
          };
          diffs.push(diff);
        }
      }
    }

    return diffs;
  }
}
