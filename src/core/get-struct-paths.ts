// Models
import { StructPaths } from '../models/jsondiffer.model'

const generatePath = (isArray: boolean, currentPath: string, newPath: string, lodashLike: boolean): string => {
  const prefix = lodashLike ? (isArray ? '[' : '.') : '/'
  const suffix = lodashLike ? (isArray ? ']' : '') : isArray ? '[]' : ''
  const path = currentPath !== '' ? `${currentPath}${prefix}${newPath}${suffix}` : `${lodashLike && isArray ? '[' : ''}${newPath}${suffix}`

  return path
}

export const getStructPaths = (struct: any, isLodashLike = false, paths: { [key: string]: any } = {}, currentPath = ''): StructPaths => {
  for (const key of Object.keys(struct)) {
    const path = generatePath(Array.isArray(struct), currentPath, key, isLodashLike)

    if (typeof struct[key] === 'object' && struct[key] !== null) {
      if (Object.keys(struct[key]).length === 0) {
        paths[path] = struct[key]
      } else {
        paths[path] = Array.isArray(struct[key]) ? '@parent-with-children-[]' : '@parent-with-children-{}'
      }

      getStructPaths(struct[key], isLodashLike, paths, path)
    } else {
      paths[path] = struct[key]
    }
  }

  return paths
}
