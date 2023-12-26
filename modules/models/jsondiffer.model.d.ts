export type EditedPath = [string, any, any];
export type StructPaths = Record<string, any>;
export type PathsDiff = [string, any];
export interface Delta {
    added: Array<PathsDiff>;
    removed: Array<PathsDiff>;
    edited: Array<EditedPath>;
}
export interface JsonDiffOptions {
    isLodashLike?: boolean;
}
