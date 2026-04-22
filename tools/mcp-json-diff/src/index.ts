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

const main = async () => {
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main().catch((err) => {
  console.error('[mcp-json-diff] fatal:', err)
  process.exit(1)
})
