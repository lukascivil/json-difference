export const addDynamicProperty = (struct: any, [path, value]: [string, any]) => {
  const keys = path.split('/')
  let structRef = struct
  const lastKeyIndex = keys.length - 1

  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keys[i]

    if (!(key in structRef)) {
      console.log({ key })

      if (key.includes('[]')) {
        const newKey = key.replace('[]', '')

        // structRef[newKey] = []
      } else {
        // structRef[key] = {}
      }
    }

    structRef = structRef[key]
  }

  structRef[keys[lastKeyIndex]] = value

  return struct
}
