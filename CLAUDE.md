# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Repository overview

Nx monorepo (yarn 4, berry) that publishes the `json-difference` library — a path-based JSON delta computer — plus ancillary projects that consume it.

| Project | Path | Type | Notes |
|---|---|---|---|
| `json-difference` | `libs/json-difference` | library (published) | Core lib, ESM/CJS + standalone browser bundle |
| `json-difference-cli` | `libs/json-difference-cli` | library (published) | `jd` CLI wrapper (yargs) |
| `mcp-json-diff` | `tools/mcp-json-diff` | application | MCP server exposing the lib via stdio |
| `playground` | `apps/playground` | application | React + Vite demo deployed to GitHub Pages |
| `example` | `apps/example` | application | Runnable Node usage scripts (`simple.ts`, `stress.ts`) |

Node >=18.17. Package manager is yarn — **do not** use npm/pnpm here (releases use `yarn dlx nx`).

# Common commands

Prefer `yarn nx` over project-local tooling. Key targets:

```sh
yarn nx test json-difference                 # Jest, ts-jest, finds **/*.spec.ts
yarn nx test json-difference --testFile=get-diff.spec.ts   # single spec
yarn nx build json-difference                # vite build (ESM/CJS via vite.config.mts)
yarn nx run json-difference:build-browser    # standalone browser bundle (vite.config.browser.mts)
yarn nx run json-difference:build-to-s3      # build-browser + prepare-to-s3.ts (versioned bundle)
yarn nx lint json-difference                 # ESLint (maxWarnings: 0)
yarn nx run-many --target=type-check         # tsc --noEmit across all projects

yarn nx serve playground                     # React dev server
yarn nx run example:test                     # runs simple.ts + stress.ts via tsx
yarn nx run mcp-json-diff:serve              # run MCP server directly (stdio)
yarn nx run mcp-json-diff:test-browser       # open @modelcontextprotocol/inspector UI
yarn nx run json-difference-cli:install-local # build CLI and `npm install -g` it

yarn graph                                   # full dep graph; yarn graph:affected for subset
yarn release[:dry-run]                       # nx release: version + changelog + publish (do not run casually)
```

The `claude` script (`yarn claude`) builds the MCP server then launches Claude Code with it available — `.mcp.json` points at `tools/mcp-json-diff/bin/src/index.js`, so the MCP server must be built before it will respond.

# Core library architecture

The library is a 4-function pipeline. Understand `getStructPaths` first — everything else operates on its output.

1. **`getStructPaths(struct, isLodashLike)`** flattens any JSON into a `Record<path, leafValue>`. Non-leaf nodes get sentinel values: `"@{}"` for objects, `"@[]"` for arrays. The synthetic `__root__` key records the top-level container type. `__start__` is an internal recursion sentinel — never leaks to output.
2. **`getPathsDiff(A, B)`** returns `[path, value]` tuples present in A but missing in B. `getDiff` calls it twice (A−B → `removed`, B−A → `added`).
3. **`getEditedPaths(oldPaths, newPaths)`** returns `[path, oldValue, newValue]` for paths present in both with changed values.
4. **`sanitizeDelta`** (`helpers/sanitize-delta.ts`) strips/rewrites the `@{}` / `@[]` sentinels so they never appear in user-visible output. Any new internal sentinel must be handled here or it will leak.

`getDiff` is the thin public composition of these four. JSON-string inputs are `JSON.parse`-ed up front, so the core routines always see real objects/arrays.

**Path formats** are mutually exclusive modes set by `isLodashLike`:
- default (slash): `a/b/0[]` — array indices marked by trailing `[]`
- lodash: `a.b[0]` — standard bracket/dot notation

Any change to path formatting must be made in `generatePath` (`get-struct-paths.ts`) and the corresponding spec updated; path shape is part of the public API and is locked down by spec fixtures.

The README's "Reference table of operations" is the behavioral contract — if a change alters any row in that table, it's a breaking change.

# Consumer projects

- **CLI** (`libs/json-difference-cli`) — thin yargs wrapper calling `getDiff`. Built with `@nx/js:tsc` to `bin/`; published as `json-difference-cli`.
- **MCP server** (`tools/mcp-json-diff`) — exposes `get_diff`, `get_edited_paths`, `get_struct_paths`, `get_paths_diff` as MCP tools plus prompt templates (breaking-change summary, changelog, config drift, migration guide). Uses `StdioServerTransport`; all inputs accept object/array/JSON-string via `parseJson`. Not published to npm.
- **Playground** (`apps/playground`) — React 19 + Chakra UI + Monaco, Vite-built, deployed to GitHub Pages by `cd.yml`. Single-file app in `src/App.tsx`.
- **Example** (`apps/example`) — `simple.ts` is the doc-style demo; `stress.ts` exercises large payloads.

# Module boundaries

`eslint.config.mjs` enforces Nx tag-based deps:

- `scope:shared` (lib, cli, mcp) → may depend only on `scope:shared`
- `scope:playground` → `scope:shared | scope:playground`
- `scope:example` → `scope:shared | scope:example`
- `type:feature` (= the core lib) → `type:feature` only

Changing a project's tags in `project.json` changes who can import it — update boundaries deliberately.

# Release flow

`json-difference`, `json-difference-cli`, `playground`, and `mcp-json-diff` each version **independently** via the built-in `nx release` (config in `nx.json` → `release`). Driven by **conventional commits**: `feat` → minor, `fix`/`docs`/`chore`/`refactor` → patch, `BREAKING CHANGE` → major (custom mapping in `release.conventionalCommits.types`). Tag pattern is `{projectName}-{version}` (no leading `v`). `release.version.preVersionCommand` runs `nx run-many -t build` first. `nx release` handles version + CHANGELOG.md + git commit/tag/push + GitHub release + npm publish in one shot. Since all projects in `release.projects` participate, nx release also syncs in-repo `json-difference` dependency versions across `json-difference-cli` and `mcp-json-diff`'s `package.json` whenever the library bumps. `playground` and `mcp-json-diff` are marked `"private": true`, so they get versioned/tagged/changelogged but are skipped by `npm publish`.

Run via `yarn release` (= `yarn nx release`); `yarn release:dry-run` previews. Do not hand-edit versions; do not amend published commits. CI workflows live in `.github/workflows/` (`ci.yml`, `cd.yml`, `release-and-publish.yml`).

# Conventions

- Commits: Conventional Commits (required by the release pipeline).
- Prettier: `endOfLine: 'auto'` is enforced via ESLint — running prettier with default config locally will flag CRLF/LF noise. Let ESLint --fix handle it.
- `AGENTS.md` and `CLAUDE.md` share the auto-updated Nx block between the `nx configuration` comment markers; keep those markers intact or the nx plugin will stop updating them.
