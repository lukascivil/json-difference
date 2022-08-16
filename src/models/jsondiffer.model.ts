type DefaultValue = number | string | boolean;

export type EditedPath = { [key: string]: { newValue: DefaultValue; oldValue: DefaultValue } };

export type StructPaths = Record<string, any>;

export type PathsDiff = Record<string, DefaultValue>;

export interface IDelta {
  new: PathsDiff;
  removed: PathsDiff;
  edited: Array<EditedPath>;
}
