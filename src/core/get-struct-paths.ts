// Models
import { StructPaths } from '../models/jsondiffer.model'

const generatePath = (isArray: boolean, currentPath: string, newPath: string, lodashLike: boolean): string => {
  const prefix = lodashLike ? (isArray ? '[' : '.') : '/'
  const suffix = lodashLike ? (isArray ? ']' : '') : isArray ? '[]' : ''
  const path = currentPath !== '' ? `${currentPath}${prefix}${newPath}${suffix}` : `${lodashLike && isArray ? '[' : ''}${newPath}${suffix}`

  return path
}

/**
 * This method returns all possible paths to leaf nodes and objects other than null
 *
 * @param struct A structure to be processed
 * @param isLodashLike Boolean to change the path generation behavior
 * @returns returns a list of all paths
 *
 *
 * @example
 * const struct = { 1: null  }
 *
 * const result = getStructPaths(struct)
 *
 *  console.log(result)
 *  // Output: {"1": null}
 */
export const getStructPaths = (struct: any, isLodashLike = false, paths: { [key: string]: any } = {}, currentPath = ''): StructPaths => {
  for (const key of Object.keys(struct)) {
    const path = generatePath(Array.isArray(struct), currentPath, key, isLodashLike)

    if (typeof struct[key] === 'object' && struct[key] !== null) {
      if (Object.keys(struct[key]).length === 0) {
        paths[path] = struct[key]
      } else {
        paths[path] = Array.isArray(struct[key]) ? '@[]' : '@{}'
      }

      getStructPaths(struct[key], isLodashLike, paths, path)
    } else {
      paths[path] = struct[key]
    }
  }

  return paths
}
