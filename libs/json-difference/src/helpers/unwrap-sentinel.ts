const OBJECT_SENTINEL = '@{}'
const ARRAY_SENTINEL = '@[]'

const unwrapSentinel = (value: unknown): unknown => {
  if (value === OBJECT_SENTINEL) {
    return {}
  }

  if (value === ARRAY_SENTINEL) {
    return []
  }

  return value
}

export { unwrapSentinel, OBJECT_SENTINEL, ARRAY_SENTINEL }
