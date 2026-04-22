#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { getDiff, getStructPaths, getEditedPaths, getPathsDiff } from 'json-difference'
import { z } from 'zod'

const jsonInputSchema = z
  .union([z.string(), z.record(z.string(), z.unknown()), z.array(z.unknown())])
  .describe('JSON structure as an object, array, or a JSON-encoded string')

const parseJson = (value: unknown): Record<string, unknown> | unknown[] => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch (err) {
      throw new Error(`Invalid JSON string: ${(err as Error).message}`)
    }
  }
  return value as Record<string, unknown> | unknown[]
}

const toTextContent = (payload: unknown) => ({
  content: [{ type: 'text' as const, text: JSON.stringify(payload, null, 2) }]
})

const server = new McpServer({
  name: 'mcp-json-diff',
  version: '0.1.0'
})

server.registerTool(
  'get_diff',
  {
    title: 'Get JSON diff',
    description:
      'Returns the delta between two JSON structures: { added, removed, edited }. ' +
      'Each entry is a path-based tuple. Accepts objects, arrays, or JSON-encoded strings.',
    inputSchema: {
      original: jsonInputSchema,
      modified: jsonInputSchema,
      isLodashLike: z.boolean().optional().describe('When true, paths use lodash-style bracket notation (e.g. "a[0].b")')
    }
  },
  async ({ original, modified, isLodashLike }) => {
    const delta = getDiff(parseJson(original) as Record<string, unknown>, parseJson(modified) as Record<string, unknown>, {
      isLodashLike: isLodashLike ?? false
    })
    return toTextContent({
      summary: {
        added: delta.added.length,
        removed: delta.removed.length,
        edited: delta.edited.length
      },
      delta
    })
  }
)

server.registerTool(
  'get_edited_paths',
  {
    title: 'Get edited paths',
    description: 'Returns only the paths whose value was edited between original and modified JSON.',
    inputSchema: {
      original: jsonInputSchema,
      modified: jsonInputSchema,
      isLodashLike: z.boolean().optional()
    }
  },
  async ({ original, modified, isLodashLike }) => {
    const oldPaths = getStructPaths(parseJson(original), isLodashLike ?? false)
    const newPaths = getStructPaths(parseJson(modified), isLodashLike ?? false)
    return toTextContent({ edited: getEditedPaths(oldPaths, newPaths) })
  }
)

server.registerTool(
  'get_struct_paths',
  {
    title: 'Get struct paths',
    description: 'Flattens a JSON structure into a map of dotted/bracketed paths to their leaf values.',
    inputSchema: {
      json: jsonInputSchema,
      isLodashLike: z.boolean().optional()
    }
  },
  async ({ json, isLodashLike }) => {
    return toTextContent({ paths: getStructPaths(parseJson(json), isLodashLike ?? false) })
  }
)

server.registerTool(
  'get_paths_diff',
  {
    title: 'Get paths diff (A - B)',
    description: 'Returns paths present in structure A but missing in B. Useful to inspect added/removed sides independently.',
    inputSchema: {
      a: jsonInputSchema,
      b: jsonInputSchema,
      isLodashLike: z.boolean().optional()
    }
  },
  async ({ a, b, isLodashLike }) => {
    const aPaths = getStructPaths(parseJson(a), isLodashLike ?? false)
    const bPaths = getStructPaths(parseJson(b), isLodashLike ?? false)
    return toTextContent({ onlyInA: getPathsDiff(aPaths, bPaths) })
  }
)

server.registerPrompt(
  'summarize-breaking-changes',
  {
    title: 'Summarize breaking API changes',
    description: 'Compare two API responses/schemas and list only the BREAKING changes, grouped by severity.',
    argsSchema: {
      original: z.string().describe('Original JSON (stringified)'),
      modified: z.string().describe('Modified JSON (stringified)')
    }
  },
  ({ original, modified }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text:
            'Use the `get_diff` tool on the two JSON payloads below, then list ONLY the breaking changes. ' +
            'Group them as: (1) Removed fields, (2) Type changes, (3) Renamed/moved fields. ' +
            'For each item, give the path and a one-line impact note. Ignore additive changes.\n\n' +
            `Original:\n\`\`\`json\n${original}\n\`\`\`\n\nModified:\n\`\`\`json\n${modified}\n\`\`\``
        }
      }
    ]
  })
)

server.registerPrompt(
  'generate-changelog',
  {
    title: 'Generate CHANGELOG entry from diff',
    description: 'Produces a Keep-a-Changelog formatted entry (Added / Changed / Removed) from two JSON versions.',
    argsSchema: {
      original: z.string().describe('Previous version JSON (stringified)'),
      modified: z.string().describe('New version JSON (stringified)'),
      version: z.string().optional().describe('Version label for the entry header, e.g. "1.2.0"')
    }
  },
  ({ original, modified, version }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text:
            'Call `get_diff` on the two JSON payloads below and convert the delta into a CHANGELOG entry ' +
            'following Keep-a-Changelog format with `### Added`, `### Changed`, `### Removed` sections. ' +
            'Each bullet must reference the JSON path. Be terse.\n\n' +
            `Version header: ${version ?? '(infer or use Unreleased)'}\n\n` +
            `Previous:\n\`\`\`json\n${original}\n\`\`\`\n\nNew:\n\`\`\`json\n${modified}\n\`\`\``
        }
      }
    ]
  })
)

server.registerPrompt(
  'explain-config-drift',
  {
    title: 'Explain config drift in plain language',
    description: 'Compare two configs (baseline vs actual) and explain drift in prose aimed at non-engineers.',
    argsSchema: {
      baseline: z.string().describe('Baseline/expected config JSON (stringified)'),
      actual: z.string().describe('Current/observed config JSON (stringified)')
    }
  },
  ({ baseline, actual }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text:
            'Use `get_diff` on the two configs below. Then write a short paragraph (non-technical audience) ' +
            'explaining how the actual config drifted from the baseline. Mention concrete settings, not JSON paths. ' +
            'End with a one-line risk assessment: low / medium / high and why.\n\n' +
            `Baseline:\n\`\`\`json\n${baseline}\n\`\`\`\n\nActual:\n\`\`\`json\n${actual}\n\`\`\``
        }
      }
    ]
  })
)

server.registerPrompt(
  'migration-guide',
  {
    title: 'Generate schema migration guide',
    description: 'Produces a step-by-step migration guide for consumers moving from schema v1 to v2.',
    argsSchema: {
      v1: z.string().describe('Old schema example JSON (stringified)'),
      v2: z.string().describe('New schema example JSON (stringified)')
    }
  },
  ({ v1, v2 }) => ({
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text:
            'Use `get_diff` to compare the two schema examples below. Then produce a migration guide with: ' +
            '(1) a summary table of field-level changes, ' +
            '(2) numbered migration steps a consumer must perform, ' +
            '(3) a sample `jq` or code snippet to transform a v1 payload into v2 where feasible.\n\n' +
            `v1 example:\n\`\`\`json\n${v1}\n\`\`\`\n\nv2 example:\n\`\`\`json\n${v2}\n\`\`\``
        }
      }
    ]
  })
)

const main = async () => {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  console.error('[mcp-json-diff] fatal:', err)
  process.exit(1)
})
