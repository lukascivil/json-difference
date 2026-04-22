# JsonDifference

[![Total Downloads](https://img.shields.io/npm/dt/json-difference.svg)](https://img.shields.io/npm/dt/json-difference.svg)
[![npm version](http://img.shields.io/npm/v/json-difference.svg?style=flat)](https://www.npmjs.com/package/json-difference 'View this project on npm')
[![CD](https://github.com/lukascivil/json-difference/actions/workflows/cd.yml/badge.svg)](https://github.com/lukascivil/json-difference/actions/workflows/cd.yml)
[![Release and Publish](https://github.com/lukascivil/json-difference/actions/workflows/release-and-publish.yml/badge.svg)](https://github.com/lukascivil/json-difference/actions/workflows/release-and-publish.yml)
[![Project Status: Active](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![codecov](https://codecov.io/gh/lukascivil/json-difference/branch/master/graph/badge.svg?token=um2lc3uRKd)](https://codecov.io/gh/lukascivil/json-difference)
[![MIT License](https://img.shields.io/npm/l/deep-object-diff.svg?style=flat)](https://github.com/lukascivil/jsondiffer/blob/master/LICENSE)

Computes the difference between two JSON structures and returns an intuitive path-based delta. Fast even on large payloads.

> **The question it answers:** _given my old structure, what was changed, removed, or added to reach the new structure?_

Lightweight: 🪶 **1.95 kB** (gzip: **0.79 kB**).

## Live Demo

- Latest release: <https://lukascivil.github.io/json-difference/>
- Master (deprecated): <http://jsondifference.lukascivil.com.br>

## Monorepo layout

This repository is an [Nx](https://nx.dev) monorepo containing multiple packages and apps:

| Package | Path | Published | Description |
|---|---|---|---|
| [`json-difference`](./libs/json-difference) | `libs/json-difference` | [npm](https://www.npmjs.com/package/json-difference) | Core library (ESM/CJS + browser bundle) |
| [`json-difference-cli`](./libs/json-difference-cli) | `libs/json-difference-cli` | [npm](https://www.npmjs.com/package/json-difference-cli) | Command-line wrapper (`jd`) |
| [`mcp-json-diff`](./tools/mcp-json-diff) | `tools/mcp-json-diff` | — | MCP server exposing the lib to AI agents |
| [`playground`](./apps/playground) | `apps/playground` | — | React live demo (deployed to GitHub Pages) |
| [`example`](./apps/example) | `apps/example` | — | Node scripts used as runnable usage examples |

## Installation

```sh
yarn add json-difference

# Optional: terminal version
yarn add json-difference-cli
```

Browser (ESM via CDN):

```html
<script type="module">
  // Replace 1.16.0 with the version you want
  import { getDiff } from 'https://json-difference.s3.amazonaws.com/1.16.0/json-difference-1.16.0.mjs'
</script>
```

**Requirements:** Node.js `>=18.17`.

## Quick usage

```ts
import { getDiff } from 'json-difference'

const coffee = { color: { color1: 'black', color2: 'brown' }, special: true }
const oil = { color: { color1: 'red', color2: 'blue' }, special2: false, especial3: [{}] }

getDiff(coffee, oil)
// {
//   added:   [["special2", false], ["especial3", []], ["especial3/0[]", {}]],
//   removed: [["special", true]],
//   edited:  [["color/color1", "black", "red"], ["color/color2", "brown", "blue"]]
// }

getDiff(coffee, oil, { isLodashLike: true })
// Paths become "color.color1", "especial3[0]" etc.
```

## API

All functions are exported from `json-difference`.

| Function | Signature | Purpose |
|---|---|---|
| `getDiff` | `(old, new, options?) => Delta` | Full delta `{ added, removed, edited }` |
| `getStructPaths` | `(json, isLodashLike?) => StructPaths` | Flatten a JSON into path → leaf value map |
| `getEditedPaths` | `(oldPaths, newPaths) => EditedPath[]` | Only paths whose value changed |
| `getPathsDiff` | `(pathsA, pathsB) => PathsDiff[]` | Paths present in A but missing in B |

### Options

| Option | Type | Default | Description |
|---|---|---|---|
| `isLodashLike` | `boolean` | `false` | Switch paths from slash-notation (`a/b/0[]`) to lodash-style bracket notation (`a.b[0]`) |

### Delta shape

| Operation | Tuple |
|---|---|
| `edited` | `[path, old_value, new_value]` |
| `added` | `[path, new_value]` |
| `removed` | `[path, old_value]` |

### Path markers

| Marker | Meaning |
|---|---|
| `__root__` | The whole object/array at the root was replaced |
| `@{}` | Non-leaf node of type object |
| `@[]` | Non-leaf node of type array |

### Reference table of operations

| Original | Modified | Delta |
|---|---|---|
| `{}` | `[]` | `edited: [["__root__", {}, []]]` |
| `[]` | `{}` | `edited: [["__root__", [], {}]]` |
| `[{}]` | `[[]]` | `edited: [["0[]", {}, []]]` |
| `{"a":"b"}` | `{"a":"c"}` | `edited: [["a", "b", "c"]]` |
| `{"":""}` | `{"":"a"}` | `edited: [["", "", "a"]]` |
| `{"":{"":""}}` | `{"":{"":"a"}}` | `edited: [["/", "", "a"]]` |
| `[]` | `[{}]` | `added: [["0[]", {}]]` |
| `{}` | `{"a":"b"}` | `added: [["a", "b"]]` |
| `{"a":"b"}` | `{}` | `removed: [["a", "b"]]` |
| `[{}]` | `[]` | `removed: [["0[]", {}]]` |

> **Note:** the output of [v1.9.1](https://github.com/lukascivil/json-difference/releases/tag/1.9.1) differs from [v1.15.7](https://github.com/lukascivil/json-difference/releases/tag/json-difference-1.15.7) and later — v1.15.7+ introduces greater accuracy in the returned paths.

## CLI

```sh
# -o = original, -m = modified
jd -o "{}" -m "[]"
```

See [`json-difference-cli`](./libs/json-difference-cli) for details.

## AI integration (MCP)

This repo ships an MCP server that exposes the library to AI agents (Claude Desktop, Claude Code, Cursor, etc.). See [`tools/mcp-json-diff`](./tools/mcp-json-diff).

## Development

Install dependencies:

```sh
yarn install
```

Common Nx targets:

```sh
yarn nx test json-difference              # run unit tests
yarn nx build json-difference             # build the lib
yarn nx serve playground                  # run the web demo
yarn nx run example:test                  # run the usage scripts
yarn nx run mcp-json-diff:serve           # run the MCP server (dev)
yarn nx run mcp-json-diff:test-browser    # open the MCP Inspector UI
yarn nx run-many --target=type-check      # type-check all projects
```

Workspace graph:

```sh
yarn graph            # full dependency graph
yarn graph:affected   # only projects affected by current changes
```

## Contributing

To request a feature or report a bug, open an [issue](https://github.com/lukascivil/json-difference/issues). PRs are welcome — follow [conventional commits](https://www.conventionalcommits.org/), the release pipeline relies on them.

## License

[MIT](./LICENSE) © lukascivil
