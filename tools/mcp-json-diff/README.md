# mcp-json-diff

An [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server that exposes the [`json-difference`](../../libs/json-difference) library as **tools** and **prompts** for AI agents (Claude Code, Claude Desktop, Cursor, Windsurf, …). Uses stdio transport.

## Why

LLMs are not deterministic at structured operations. Asking them to "compare these two JSONs" by hand works on small payloads but falls apart on large ones — missed fields, hallucinated paths, wrong diffs. This server lets the agent call the **real** `json-difference` lib and work from the exact delta.

## Capabilities

### Tools (agent-invoked, autonomous)

| Tool | Description |
|---|---|
| `get_diff` | Full delta `{ added, removed, edited }` between two JSON structures |
| `get_edited_paths` | Only the paths whose value changed |
| `get_struct_paths` | Flatten a single JSON into path → leaf-value map |
| `get_paths_diff` | Paths present in A but missing from B |

All JSON inputs accept objects, arrays, or JSON-encoded strings.
Optional `isLodashLike: true` switches paths to bracket notation (`a[0].b`).

### Prompts (user-invoked, shortcut templates)

Pre-built, parameterized prompts that appear in MCP clients (attachment menu in Claude Desktop, `/mcp__*` slash commands in Claude Code, etc.):

| Prompt | Arguments | Output |
|---|---|---|
| `summarize-breaking-changes` | `original`, `modified` | Breaking changes grouped by severity |
| `generate-changelog` | `original`, `modified`, `version?` | Keep-a-Changelog formatted entry |
| `explain-config-drift` | `baseline`, `actual` | Plain-language drift explanation + risk level |
| `migration-guide` | `v1`, `v2` | Field change table + numbered steps + transform snippet |

Each prompt instructs the agent to call `get_diff` internally — you get a deterministic delta plus an LLM narrative in one click.

## Requirements

- Node.js `>=18.17`
- A MCP-compatible client (Claude Desktop, Claude Code, Cursor, etc.)

## Running

Dev (no build step, via `tsx`):

```sh
yarn nx run mcp-json-diff:serve
```

Production (compiled to `bin/`):

```sh
yarn nx run mcp-json-diff:build
node tools/mcp-json-diff/bin/src/index.js
```

Inspector UI (preview tools + prompts without an LLM):

```sh
yarn nx run mcp-json-diff:test-browser
```

Opens the [MCP Inspector](https://github.com/modelcontextprotocol/inspector) in your browser, typically at `http://localhost:6274`. Great for verifying payloads before wiring a real client.

## Client configuration

### Claude Desktop

Edit `claude_desktop_config.json`:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Using the compiled bin (most reliable — no `yarn`/`tsx` required at runtime):

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

Or running directly from TypeScript source with `tsx`:

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

> Fully quit and reopen Claude Desktop (exit from the system tray on Windows / menu bar on macOS) — it only reads the config at startup.

Prompts appear in the **attachment menu** (“+” next to the chat input), not as `/` slash commands.

### Claude Code

```sh
claude mcp add json-diff -- node h:/GitHub/jsondiffer/tools/mcp-json-diff/bin/src/index.js
```

Prompts become slash commands: `/mcp__json-diff__summarize-breaking-changes`, etc.

### Cursor / Windsurf / others

Same JSON shape — refer to the client’s MCP docs. The `command` + `args` + optional `cwd` fields are standard.

## Example tool call

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

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Server not listed in Claude Desktop | Config JSON is invalid — validate with a JSON linter. Also fully quit and restart the app |
| `spawn yarn ENOENT` in logs | Claude Desktop doesn't inherit your shell PATH. Use `node` + absolute path to the built `bin/` file instead |
| Tools show up but prompts don't | Older client version — update. Prompts require a client that implements the full MCP spec |
| "Cannot find module" at startup | Run `yarn nx run mcp-json-diff:build` first if pointing at `bin/`, or install deps (`yarn install`) if using `tsx` |

Logs:

- **Claude Desktop (Windows):** `%APPDATA%\Claude\logs\mcp-server-json-diff.log`
- **Claude Desktop (macOS):** `~/Library/Logs/Claude/mcp-server-json-diff.log`

## Development

```sh
yarn nx run mcp-json-diff:type-check    # TypeScript check
yarn nx run mcp-json-diff:build         # Compile to bin/
yarn nx run mcp-json-diff:serve         # Run directly (tsx)
yarn nx run mcp-json-diff:test-browser  # Open MCP Inspector UI
```

Source: [`src/index.ts`](./src/index.ts) — a single file registering tools and prompts against `@modelcontextprotocol/sdk`.

## Links

- Parent repo: <https://github.com/lukascivil/json-difference>
- MCP specification: <https://modelcontextprotocol.io>
- MCP Inspector: <https://github.com/modelcontextprotocol/inspector>
