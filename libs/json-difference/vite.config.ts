// Packages
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import * as path from 'path'

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
      formats: ['es', 'cjs']
    }
  }
  // build: {
  //   lib: { entry: resolve(__dirname, 'src/index.ts'), name: 'json-difference', fileName: 'index', formats: ['es'] }
  //   // outDir: './dist.browser'
  // },
})
