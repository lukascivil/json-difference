/// <reference types='vitest' />
// Packages
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/libs/json-difference',
  resolve: { tsconfigPaths: true },
  plugins: [
    nxCopyAssetsPlugin(['*.md']),
    dts({ entryRoot: 'src', tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json'), pathsToAliases: false })
  ],
  build: {
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    },
    lib: {
      entry: 'src/index.ts',
      name: 'json-difference',
      fileName: 'index',
      formats: ['es', 'cjs', 'umd']
    }
  }
})
