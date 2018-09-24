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
    delta.removed = this.getRemovedPaths(struct1_paths, struct2_paths)
    // // B-A
    delta.new = this.getAddedPaths(struct1_paths, struct2_paths)
    // // a->b
    delta.edited = this.getEditedPaths(struct1_paths, struct2_paths)

    return delta;
  }

  private getStructPaths(struct: any, paths: any = [], currentpath = '') {
    let oi: any
    for (const key in struct) {
      let path = currentpath !== '' ? currentpath + "/" + key : key;
      console.log('key', key)
      console.log('struct[key]', struct[key])
      if (typeof struct[key] == "object") {
        this.getStructPaths(struct[key], paths, path);
      } else {
        oi = {
          [path]: struct[key]
        };
        paths.push(oi);

      }
    };
    return paths;
  }

  // Diference
  private getRemovedPaths(struct1_paths: any, struct2_paths: any) {
    return struct1_paths.filter((x: any) => !struct2_paths.includes(x))
  }

  private getAddedPaths(struct1_paths: any, struct2_paths: any) {
    return struct2_paths.filter((x: any) => !struct1_paths.includes(x))
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