import { Delta, JsonDiffOptions } from '../models/jsondiffer.model';
/**
 * This method returns a delta object containing all the information needed to understand what happened during
 * the transition from the original object to the modified one.
 *
 * @param oldStruct Original structure to be investigated
 * @param newStruct Modified structure to be investigated
 * @param options Options for changing result behavior
 * @returns returns a JSON diference delta
 *
 *
 * @example
 *  const oldStruct = { 1: null }
 *  const newStruct = { 1: "coffee" }
 *
 *  const result = getDiff(oldStruct, newStruct)
 *
 *  console.log(result)
 *  // Output: {"edited": [["1", null, "coffee"]], added: [], removed: []}
 */
export declare const getDiff: (oldStruct: Record<string, any> | string, newStruct: Record<string, any> | string, options?: JsonDiffOptions) => Delta;
