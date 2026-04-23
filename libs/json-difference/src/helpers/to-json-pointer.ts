const ROOT_SENTINEL = '__root__'
const ARRAY_INDEX_MARKER = '[]'

/**
 * Convert a json-difference internal path to an RFC 6901 JSON Pointer.
 *
 * Internal format:
 *   - `/` as segment separator, no leading `/`
 *   - Array indices suffixed with `[]` (e.g. `0[]`, `foo/1[]`)
 *   - `__root__` refers to the whole document
 *
 * JSON Pointer format (RFC 6901):
 *   - Must start with `/` (except the empty string, which refers to the whole document)
 *   - `~` escaped as `~0`, `/` in a key escaped as `~1`
 */
export const toJsonPointer = (libPath: string): string => {
  if (libPath === ROOT_SENTINEL) {
    return ''
  }

  const tokens = libPath.split('/').map((token) => {
    const stripped = token.endsWith(ARRAY_INDEX_MARKER) ? token.slice(0, -ARRAY_INDEX_MARKER.length) : token
    return stripped.replace(/~/g, '~0')
  })

  return '/' + tokens.join('/')
}
