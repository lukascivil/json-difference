// Packages
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import fs from 'fs'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin'

const version: string = JSON.parse(fs.readFileSync('libs/json-difference/package.json', 'utf-8')).version

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/json-difference',
  plugins: [
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({ entryRoot: 'src', tsconfigPath: path.join(import.meta.dirname, 'tsconfig.lib.json'), pathsToAliases: false })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'json-difference',
      fileName: `json-difference-${version}`,
      formats: ['es', 'cjs', 'umd']
    }
  }
})
