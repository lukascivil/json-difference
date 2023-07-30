import { StructPaths } from '../models/jsondiffer.model';
/**
 * This method returns all possible paths to leaf nodes and objects other than null
 *
 * @param struct A structure to be processed
 * @param isLodashLike Boolean to change the path generation behavior
 * @returns returns a list of all paths
 *
 *
 * @example
 * const struct = { 1: { 2: null }  }
 *
 * const result1 = getStructPaths(struct)
 * const result2 = getStructPaths(struct, { isLodashLike: true }})
 *
 *
 * The values "@{}" and "@[]" are used internally to represent objects and arrays respectively.
 * But they have a particular meaning, where the key is parent, that is, it must have children.
 * ("@{}" !== "{}" && "@[]" !== "[]") => true
 *
 *  console.log(result)
 *  // Output: {"1": "@{}","1/2": null}
 *
 * console.log(result)
 *  // Output: {"1": "@{}","1.2": null}
 */
export declare const getStructPaths: (struct: any, isLodashLike?: boolean, paths?: {
    [key: string]: any;
} | undefined, currentPath?: string) => StructPaths;
