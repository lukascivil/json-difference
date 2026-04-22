# mcp-json-diff

MCP server that exposes the `json-difference` library as tools for AI agents
(Claude Code, Claude Desktop, Cursor, etc.). Uses stdio transport.

## Tools

| Tool | Description |
|---|---|
| `get_diff` | Full delta `{ added, removed, edited }` between two JSON structures |
| `get_edited_paths` | Only the paths whose value changed |
| `get_struct_paths` | Flattens a single JSON into path → leaf-value map |
| `get_paths_diff` | Paths in A missing from B |

All JSON inputs accept objects, arrays, or JSON-encoded strings.
Optional `isLodashLike: true` switches paths to bracket notation (`a[0].b`).

## Running

Dev (via `tsx`, no build step):

```bash
yarn nx run mcp-json-diff:serve
```

Production (compiled to `bin/`):

```bash
yarn nx run mcp-json-diff:build
node tools/mcp-json-diff/bin/src/index.js
```

Browser inspector (opens MCP Inspector UI connected to this server):

```bash
yarn nx run mcp-json-diff:test-browser
```

## Client configuration

### Claude Code / Claude Desktop (`mcp.json` or `claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "json-diff": {
      "command": "node",
      "args": ["h:/GitHub/jsondiffer/tools/mcp-json-diff/bin/src/index.js"]
    }
  }
}
```

Or, running directly from TypeScript source with `tsx`:

```json
{
  "mcpServers": {
    "json-diff": {
      "command": "yarn",
      "args": ["tsx", "tools/mcp-json-diff/src/index.ts"],
      "cwd": "h:/GitHub/jsondiffer"
    }
  }
}
```

## Example call

Input:

```json
{
  "name": "get_diff",
  "arguments": {
    "original": { "foo": { "bar": "true" } },
    "modified": { "foo": {} }
  }
}
```

Output:

```json
{
  "summary": { "added": 0, "removed": 1, "edited": 0 },
  "delta": {
    "added": [],
    "removed": [["foo/bar", "true"]],
    "edited": []
  }
}
```
