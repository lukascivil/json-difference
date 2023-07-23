// Models
import { Delta, JsonPatch } from '../models/jsondiffer.model'

export const generateJsonPatch = (delta: Delta): Array<JsonPatch> => {
  const operations: Array<JsonPatch> = []

  delta.added.forEach((path) => {
    operations.push({
      op: 'remove',
      path: path[0]
    })
  })

  delta.edited.forEach((path) => {
    operations.push({
      op: 'replace',
      path: path[0],
      value: path[1]
    })
  })

  delta.removed.forEach((path) => {
    operations.push({
      op: 'add',
      path: path[0],
      value: path[1]
    })
  })

  return operations
}
