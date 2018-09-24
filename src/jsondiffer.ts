export class JsonDiffer {
  constructor() { }

  public getDiff(struct1: any, struct2: any) {
    const delta = {
      new: [],
      removed: [],
      edited: [],
    };

    let struct1_paths = this.getStructPaths(struct1);
    let struct2_paths = this.getStructPaths(struct2);

    // A-B
    delta.removed = this.getPathsDiff(struct1_paths, struct2_paths)
    // B-A
    delta.new = this.getPathsDiff(struct2_paths, struct1_paths)
    // a->b
    delta.edited = this.getEditedPaths(struct1_paths, struct2_paths)

    return delta;
  }

  private getStructPaths(struct: any, paths: any = [], currentpath = '') {
    for (const key in struct) {
      let path = currentpath !== '' ? currentpath + "/" + key : key;
      if (typeof struct[key] == "object") {
        this.getStructPaths(struct[key], paths, path);
      } else {
        paths[path] = struct[key];
      }
    };
    return paths;
  }

  // Diference by key
  private getPathsDiff(struct1_paths: any, struct2_paths: any) {
    let diff: any = {};

    for (const key in struct1_paths) {
      if (!(key in struct2_paths)) {
        diff[key] = struct1_paths[key];
      }
    }

    return diff;
  }

  // Diference by value
  private getEditedPaths(struct1_paths: any, struct2_paths: any) {
    let diffs: any = [];
    let diff: any = {};

    for (const key in struct1_paths) {
      if (struct2_paths.hasOwnProperty(key)) {
        if (struct1_paths[key] != struct2_paths[key]) {
          diff = {
            [key]: {
              newvalue: struct1_paths[key],
              oldvalue: struct2_paths[key]
            }
          };
          diffs.push(diff);
        }
      }
    }
    return diffs;
  }

}