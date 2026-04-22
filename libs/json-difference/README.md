# json-difference

[![npm version](http://img.shields.io/npm/v/json-difference.svg?style=flat)](https://www.npmjs.com/package/json-difference)
[![Total Downloads](https://img.shields.io/npm/dt/json-difference.svg)](https://www.npmjs.com/package/json-difference)
[![MIT License](https://img.shields.io/npm/l/json-difference.svg?style=flat)](https://github.com/lukascivil/jsondiffer/blob/master/LICENSE)

Computes the difference between two JSON structures and returns an intuitive path-based delta `{ added, removed, edited }`. Fast even on large payloads.

🪶 Lightweight: **1.95 kB** (gzip: **0.79 kB**). Zero runtime dependencies.

## Installation

```sh
yarn add json-difference
# or
npm install json-difference
```

**Requirements:** Node.js `>=18.17`.

## Usage

```ts
import { getDiff } from 'json-difference'

const oldStruct = { color: { color1: 'black', color2: 'brown' }, special: true }
const newStruct = { color: { color1: 'red', color2: 'blue' }, special2: false }

getDiff(oldStruct, newStruct)
// {
//   added:   [["special2", false]],
//   removed: [["special", true]],
//   edited:  [
//     ["color/color1", "black", "red"],
//     ["color/color2", "brown", "blue"]
//   ]
// }
```

### Lodash-style paths

```ts
getDiff(oldStruct, newStruct, { isLodashLike: true })
// edited: [["color.color1", "black", "red"], ...]
```

## API

```ts
import {
  getDiff,
  getStructPaths,
  getEditedPaths,
  getPathsDiff,
  // types
  Delta,
  EditedPath,
  PathsDiff,
  StructPaths,
  JsonDiffOptions
} from 'json-difference'
```

### `getDiff(old, new, options?) => Delta`

High-level entry point. Returns a full delta.

```ts
interface Delta {
  added:   Array<[path: string, value: unknown]>
  removed: Array<[path: string, value: unknown]>
  edited:  Array<[path: string, oldValue: unknown, newValue: unknown]>
}
```

Accepts objects, arrays, or JSON-encoded strings for both inputs.

### `getStructPaths(json, isLodashLike?) => StructPaths`

Flattens a JSON into a plain object mapping **dot/slash paths → leaf values**. Building block used internally by `getDiff`.

```ts
getStructPaths({ a: { b: 1 }, c: [true] })
// { "a/b": 1, "c/0[]": true }
```

### `getEditedPaths(oldPaths, newPaths) => EditedPath[]`

Given two flattened path maps, returns only the paths whose value changed.

### `getPathsDiff(pathsA, pathsB) => PathsDiff[]`

Returns the paths present in `pathsA` but missing from `pathsB` (set difference). `getDiff` uses this with `(old, new)` for `removed` and with `(new, old)` for `added`.

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| `isLodashLike` | `boolean` | `false` | Use lodash-style bracket notation (`a.b[0]`) instead of slash notation (`a/b/0[]`) |

## Path format

| Marker | Meaning |
|---|---|
| `__root__` | Root object/array was replaced entirely |
| `@{}` | Non-leaf node of type object |
| `@[]` | Non-leaf node of type array |

### Reference operations

| Original | Modified | Delta |
|---|---|---|
| `{}` | `[]` | `edited: [["__root__", {}, []]]` |
| `{"a":"b"}` | `{"a":"c"}` | `edited: [["a", "b", "c"]]` |
| `{}` | `{"a":"b"}` | `added: [["a", "b"]]` |
| `{"a":"b"}` | `{}` | `removed: [["a", "b"]]` |
| `[{}]` | `[]` | `removed: [["0[]", {}]]` |

## Browser usage (CDN)

```html
<script type="module">
  import { getDiff } from 'https://json-difference.s3.amazonaws.com/1.16.1/json-difference-1.16.1.mjs'
  console.log(getDiff({ a: 1 }, { a: 2 }))
</script>
```

## Related packages

- [`json-difference-cli`](https://www.npmjs.com/package/json-difference-cli) — CLI wrapper (`jd -o … -m …`)
- [`mcp-json-diff`](https://github.com/lukascivil/json-difference/tree/master/tools/mcp-json-diff) — MCP server for AI agents (Claude, Cursor, etc.)

## Links

- Repository: <https://github.com/lukascivil/json-difference>
- Live playground: <https://lukascivil.github.io/json-difference/>
- Issues: <https://github.com/lukascivil/json-difference/issues>
- [Changelog](./CHANGELOG.md)

## License

[MIT](../../LICENSE) © lukascivil
