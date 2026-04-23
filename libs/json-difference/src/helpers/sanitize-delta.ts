import { Delta, EditedPath } from '../models'
import { OBJECT_SENTINEL, unwrapSentinel } from './unwrap-sentinel'

/**
 * This method returns the sanitized delta.
 * Some paths returned by getStructPaths() may not make much sense and be redundant to the end user.
 *
 * @param delta Delta to be sanitized
 * @returns Sanitized Delta
 */
const sanitizeDelta = (delta: Delta): Delta => {
  delta.edited = delta.edited
    .filter((editedPath) => {
      // Unnecessary path
      // [{}] vs [{"":""}] => false
      if (typeof editedPath[1] === 'object' && editedPath[2] === OBJECT_SENTINEL) {
        return false
      }

      return true
    })
    .map((editedPath): EditedPath => {
      // Sentinel values ("@{}" / "@[]") are for internal use only and must never
      // leak to user-facing output. Preserve original tuple reference when no
      // sentinel is present to avoid unnecessary allocations.
      const unwrapped = unwrapSentinel(editedPath[2])

      return unwrapped === editedPath[2] ? editedPath : [editedPath[0], editedPath[1], unwrapped]
    })

  return delta
}

export default sanitizeDelta
