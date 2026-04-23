// Models
import { JsonPatch } from '../models/json-difference.model'

const deepClone = <T>(value: T): T => (value === undefined ? value : JSON.parse(JSON.stringify(value)))

/**
 * Parse an RFC 6901 JSON Pointer into a list of decoded tokens.
 *   ""         → []          (root)
 *   "/foo"     → ["foo"]
 *   "/a~1b/c"  → ["a/b", "c"]
 *   "/a~0b"    → ["a~b"]
 */
const parsePointer = (pointer: string): Array<string> => {
  if (pointer === '') {
    return []
  }

  if (!pointer.startsWith('/')) {
    throw new Error(`Invalid JSON Pointer: "${pointer}" (must be empty or start with "/")`)
  }

  return pointer
    .slice(1)
    .split('/')
    .map((token) => token.replace(/~1/g, '/').replace(/~0/g, '~'))
}

const navigateToParent = (document: any, tokens: Array<string>): any => {
  let current = document

  for (let i = 0; i < tokens.length - 1; i++) {
    const token = tokens[i]

    current = Array.isArray(current) ? current[Number(token)] : current[token]
  }

  return current
}

/**
 * Apply an RFC 6902 JSON Patch to a document and return the resulting
 * document. The input `document` is cloned — it is never mutated.
 *
 * Supports the `add`, `remove` and `replace` operations that
 * `generateJsonPatch` emits. Other RFC 6902 operations (`move`, `copy`,
 * `test`) are intentionally not implemented.
 *
 * @example
 *   const oldDoc = { a: 1 }
 *   const patch = [{ op: 'add', path: '/b', value: 2 }]
 *   implementJsonPatch(oldDoc, patch)  // → { a: 1, b: 2 }
 */
export const implementJsonPatch = (document: any, patch: Array<JsonPatch>): any => {
  let doc = deepClone(document)

  for (const op of patch) {
    const tokens = parsePointer(op.path)

    // Root operation: the whole document is the target.
    if (tokens.length === 0) {
      doc = op.op === 'remove' ? null : deepClone(op.value)
      continue
    }

    const parent = navigateToParent(doc, tokens)
    const lastToken = tokens[tokens.length - 1]
    const isArrayParent = Array.isArray(parent)

    if (op.op === 'add') {
      if (isArrayParent) {
        const index = lastToken === '-' ? parent.length : Number(lastToken)
        parent.splice(index, 0, deepClone(op.value))
      } else {
        parent[lastToken] = deepClone(op.value)
      }
    } else if (op.op === 'remove') {
      if (isArrayParent) {
        parent.splice(Number(lastToken), 1)
      } else {
        delete parent[lastToken]
      }
    } else if (op.op === 'replace') {
      if (isArrayParent) {
        parent[Number(lastToken)] = deepClone(op.value)
      } else {
        parent[lastToken] = deepClone(op.value)
      }
    }
  }

  return doc
}
