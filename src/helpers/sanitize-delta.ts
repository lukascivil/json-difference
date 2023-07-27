import { Delta } from '../models'

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
      if (typeof editedPath[1] === 'object' && editedPath[2] === '@{}') {
        return false
      }

      return true
    })
    .map((editedPath) => {
      // Value as "@{}" for internal use, can cause confusion
      // {"": ""} vs {"": {"": ""}} => false
      if (editedPath[2] === '@{}') {
        return [editedPath[0], editedPath[1], {}]
      }

      // Value as "@[]" for internal use, can cause confusion
      // {"": ""} vs {"": [""]} => false
      if (editedPath[2] === '@[]') {
        return [editedPath[0], editedPath[1], []]
      }

      return editedPath
    })

  return delta
}

export default sanitizeDelta
