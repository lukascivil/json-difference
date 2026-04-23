// Models
import { Delta, JsonPatch, JsonPatchAdd, JsonPatchRemove, JsonPatchReplace } from '../models/json-difference.model'

// Helpers
import { toJsonPointer } from '../helpers/to-json-pointer'

const byDepthDesc = (a: JsonPatchRemove, b: JsonPatchRemove): number => b.path.split('/').length - a.path.split('/').length

/**
 * Build an RFC 6902 JSON Patch that describes the transformation from the
 * original structure to the modified one, given a Delta produced by getDiff.
 *
 * Only `add`, `remove` and `replace` operations are emitted. Paths are
 * converted from the internal path format to RFC 6901 JSON Pointers.
 *
 * Operation ordering is chosen so that the patch can be applied sequentially
 * against the original document:
 *   1. `remove` ops, deepest path first (so a parent is not removed before its children)
 *   2. `replace` ops in delta order
 *   3. `add` ops in delta order (DFS already places parents before children)
 */
export const generateJsonPatch = (delta: Delta): Array<JsonPatch> => {
  const removeOps: Array<JsonPatchRemove> = delta.removed
    .map(([path]) => ({ op: 'remove' as const, path: toJsonPointer(path) }))
    .sort(byDepthDesc)

  const replaceOps: Array<JsonPatchReplace> = delta.edited.map(([path, , newValue]) => ({
    op: 'replace' as const,
    path: toJsonPointer(path),
    value: newValue
  }))

  const addOps: Array<JsonPatchAdd> = delta.added.map(([path, value]) => ({
    op: 'add' as const,
    path: toJsonPointer(path),
    value
  }))

  return [...removeOps, ...replaceOps, ...addOps]
}
