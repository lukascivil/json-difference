type DefaultValue = number | string | boolean;

export type EditedPaths = Array<{ [key: string]: { newValue: DefaultValue; oldValue: DefaultValue } }>;
export type StructPaths = Array<{ [key: string]: DefaultValue }>;
export type PathsDiff = { [key: string]: DefaultValue };

export interface IDelta {
  new: PathsDiff;
  removed: PathsDiff;
  edited: EditedPaths;
}
