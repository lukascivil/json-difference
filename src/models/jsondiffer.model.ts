export type EditedPath = [string, any, any]

export type StructPaths = Record<string, any>

export type PathsDiff = [string, any]

export interface Delta {
  added: Array<PathsDiff>
  removed: Array<PathsDiff>
  edited: Array<EditedPath>
}

export interface DeltaObject {
  added: Array<any>
  removed: Array<any>
  edited: Array<any>
}

export interface JsonDiffOptions {
  isLodashLike?: boolean
  isObjectOutput?: boolean
}
