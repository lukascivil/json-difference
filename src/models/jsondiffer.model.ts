export type DefaultValue = number | string | boolean;

export type EditedPaths = Array<{ [key: string]: { newValue: DefaultValue; oldValue: DefaultValue } }>;
export interface IStructPaths {
  [key: string]: DefaultValue;
}

export interface IPathsDiff {
  [key: string]: DefaultValue;
}

export interface IDelta {
  new: IPathsDiff;
  removed: IPathsDiff;
  edited: EditedPaths;
}
