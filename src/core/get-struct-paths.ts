// Models
import { StructPaths } from '../models/jsondiffer.model'

export const getStructPaths = (struct: any, paths: any = {}, currentPath = ''): StructPaths => {
  for (const key of Object.keys(struct)) {
    const path = currentPath !== '' ? `${currentPath}/${key}` : key

    if (typeof struct[key] === 'object') {
      if (Object.keys(struct[key]).length === 0) {
        paths[path] = struct[key]
      }

      getStructPaths(struct[key], paths, path)
    } else {
      paths[path] = struct[key]
    }
  }

  return paths
}
