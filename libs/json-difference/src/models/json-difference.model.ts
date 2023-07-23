export type EditedPath = [string, any, any]

export type StructPaths = Record<string, any>

export type PathsDiff = [string, any]

export interface Delta {
  added: Array<PathsDiff>
  removed: Array<PathsDiff>
  edited: Array<EditedPath>
}

export interface JsonDiffOptions {
  isLodashLike?: boolean
}

export interface JsonPatchRemove {
  op: 'remove'
  path: string
}

export interface JsonPatchReplace {
  op: 'replace'
  path: string
  value: any
}

export interface JsonPatchAdd {
  op: 'add'
  path: string
  value: any
}

export type JsonPatch = JsonPatchRemove | JsonPatchReplace | JsonPatchAdd
