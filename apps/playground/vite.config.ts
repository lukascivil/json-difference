import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), viteTsConfigPaths()],
  base: '/json-difference',
  build: {
    outDir: '../../docs'
  }
})
