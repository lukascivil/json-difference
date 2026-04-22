# Example

Runnable Node scripts that exercise the [`json-difference`](../../libs/json-difference) library — one hand-crafted tiny case and one stress test against real fixtures.

Useful as:
- A smoke test when iterating on the library
- Reference for how to import and call `getDiff` in a Node program

## Scripts

| File | Purpose |
|---|---|
| [`src/simple.ts`](./src/simple.ts) | Diffs two small inline objects, prints delta + execution time |
| [`src/stress.ts`](./src/stress.ts) | Diffs two large JSON fixtures from [`src/assets/`](./src/assets/), prints delta + execution time |

## Running

From the repository root:

```sh
# Run both scripts (simple + stress) in parallel via tsx
yarn nx run example:test

# Compile to dist/ (TypeScript + copy JSON fixtures)
yarn nx build example
```

Or run a single script directly with `tsx`:

```sh
yarn tsx apps/example/src/simple.ts
yarn tsx apps/example/src/stress.ts
```

## Example output

```
diff {"added":[["special2",false]],"removed":[["special",true]],"edited":[["color/color1","black","red"],["color/color2","brown","blue"]]}
Execution time: 1ms
```

## Adding a case

1. Drop a new `.ts` file under [`src/`](./src/)
2. Import from `json-difference` (already wired via the monorepo tsconfig paths)
3. Optionally register it in [`project.json`](./project.json) so it runs under `yarn nx run example:test`
