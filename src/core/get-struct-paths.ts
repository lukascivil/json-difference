// Models
import { StructPaths } from '../models/jsondiffer.model'

export const getStructPaths = (struct: any, paths: { [key: string]: any } = {}, currentPath = ''): StructPaths => {
  for (const key of Object.keys(struct)) {
    const path = currentPath !== '' ? `${currentPath}/${key}` : key
    const finalPath = Array.isArray(struct) ? `${path}[]` : path

    if (typeof struct[key] === 'object') {
      if (Object.keys(struct[key]).length === 0) {
        paths[path] = struct[key]
      }

      getStructPaths(struct[key], paths, finalPath)
    } else {
      paths[finalPath] = struct[key]
    }
  }

  return paths
}
