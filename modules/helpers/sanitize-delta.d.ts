import { Delta } from '../models';
/**
 * This method returns the sanitized delta.
 * Some paths returned by getStructPaths() may not make much sense and be redundant to the end user.
 *
 * @param delta Delta to be sanitized
 * @returns Sanitized Delta
 */
declare const sanitizeDelta: (delta: Delta) => Delta;
export default sanitizeDelta;
