# json-difference-cli

[![npm version](http://img.shields.io/npm/v/json-difference-cli.svg?style=flat)](https://www.npmjs.com/package/json-difference-cli)
[![Total Downloads](https://img.shields.io/npm/dt/json-difference-cli.svg)](https://www.npmjs.com/package/json-difference-cli)
[![MIT License](https://img.shields.io/npm/l/json-difference-cli.svg?style=flat)](https://github.com/lukascivil/jsondiffer/blob/master/LICENSE)

Command-line wrapper around [`json-difference`](https://www.npmjs.com/package/json-difference). Computes the delta between two JSON strings and prints it to stdout.

## Installation

Global (recommended for CLI use):

```sh
npm install -g json-difference-cli
# or
yarn global add json-difference-cli
```

One-off:

```sh
npx json-difference-cli -o "{}" -m '{"a":1}'
```

## Usage

```sh
jd -o <original-json> -m <modified-json>
```

### Options

| Flag | Alias | Required | Description |
|---|---|---|---|
| `-o` | `--original` | yes | Original (old) JSON string |
| `-m` | `--modified` | yes | Modified (new) JSON string |

### Examples

```sh
# Simple key change
jd -o '{"a":"b"}' -m '{"a":"c"}'
# delta ---> { added: [], removed: [], edited: [ [ 'a', 'b', 'c' ] ] }

# Added / removed keys
jd -o '{"a":1}' -m '{"b":2}'
# delta ---> { added: [["b", 2]], removed: [["a", 1]], edited: [] }

# Root type change
jd -o '{}' -m '[]'
# delta ---> { added: [], removed: [], edited: [["__root__", {}, []]] }
```

### Shell quoting tip

JSON uses double quotes, so on macOS/Linux wrap the argument in single quotes:

```sh
jd -o '{"foo":"bar"}' -m '{"foo":"baz"}'
```

On Windows PowerShell, escape the inner quotes or use single quotes:

```powershell
jd -o '{\"foo\":\"bar\"}' -m '{\"foo\":\"baz\"}'
```

## Output format

The tool prints the delta returned by [`getDiff`](https://www.npmjs.com/package/json-difference):

```ts
{
  added:   [[path, value], ...],
  removed: [[path, value], ...],
  edited:  [[path, oldValue, newValue], ...]
}
```

See the [`json-difference` README](https://www.npmjs.com/package/json-difference) for the full path format and semantics.

## Related packages

- [`json-difference`](https://www.npmjs.com/package/json-difference) — the underlying library (use directly in code)
- [`mcp-json-diff`](https://github.com/lukascivil/json-difference/tree/master/tools/mcp-json-diff) — MCP server for AI agents

## Links

- Repository: <https://github.com/lukascivil/json-difference>
- Issues: <https://github.com/lukascivil/json-difference/issues>
- [Changelog](./CHANGELOG.md)

## License

[MIT](../../LICENSE) © lukascivil
