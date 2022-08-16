export type EditedPath = { [key: string]: { newValue: any; oldValue: any } };

export type StructPaths = Record<string, any>;

export type PathsDiff = Record<string, any>;

export interface Delta {
  added: PathsDiff;
  removed: PathsDiff;
  edited: Array<EditedPath>;
}
