// Packages
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as path from 'path'
import fs from 'fs'

const version: string = JSON.parse(fs.readFileSync('libs/json-difference/package.json', 'utf-8')).version

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
      fileName: `json-difference-${version}`,
      formats: ['es', 'cjs', 'umd']
    }
  }
})
