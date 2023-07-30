import { EditedPath, StructPaths } from '../models/jsondiffer.model';
/**
 * This method returns all paths whose leaf value has changed
 *
 * @param oldStructPaths Original paths to be investigated
 * @param newStructPaths Modified paths to be investigated
 * @returns returns an object with all edited paths
 *
 *
 * @example
 * const oldStruct = { 1: null  }
 * const newStruct = { 1: "coffee" }
 *
 * const result = getEditedPaths(oldStruct, newStruct)
 *
 *  console.log(result)
 *  // Output: [1, null ,"coffee"]
 */
export declare const getEditedPaths: (oldStructPaths: StructPaths, newStructPaths: StructPaths) => Array<EditedPath>;
