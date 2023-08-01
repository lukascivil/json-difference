// Packages
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import rollupPluginCopy from 'rollup-plugin-copy'

export default defineConfig({
  cacheDir: '../../node_modules/.vite/json-difference',
  plugins: [
    dts({
      entryRoot: 'src',
      tsConfigFilePath: path.join(__dirname, 'tsconfig.lib.json'),
      skipDiagnostics: true
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'json-difference',
      fileName: 'index',
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      plugins: [
        rollupPluginCopy({
          targets: [
            {
              src: 'package.json',
              dest: './dist'
            }
          ],
          hook: 'writeBundle'
        })
      ]
    }
  }
})
