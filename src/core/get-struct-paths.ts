// Models
import { StructPaths } from '../models/jsondiffer.model'

const generatePath = (isArray: boolean, currentPath: string, newPath: string, lodashLike: boolean): string => {
  const prefix = lodashLike ? (isArray ? '[' : '.') : '/'
  const suffix = lodashLike ? (isArray ? ']' : '') : isArray ? '[]' : ''
  const path = currentPath !== '' ? `${currentPath}${prefix}${newPath}${suffix}` : `${newPath}${suffix}`

  return path
}

export const getStructPaths = (struct: any, lodashLike = false, paths: { [key: string]: any } = {}, currentPath = ''): StructPaths => {
  for (const key of Object.keys(struct)) {
    const path = generatePath(Array.isArray(struct), currentPath, key, lodashLike)

    if (typeof struct[key] === 'object') {
      if (Object.keys(struct[key]).length === 0) {
        paths[path] = struct[key]
      }

      getStructPaths(struct[key], lodashLike, paths, path)
    } else {
      paths[path] = struct[key]
    }
  }

  return paths
}
