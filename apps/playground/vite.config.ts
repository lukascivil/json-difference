import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/playground',
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  base: '/json-difference',
  server: {
    host: 'localhost',
    port: 3000,
    fs: {
      allow: [searchForWorkspaceRoot(import.meta.dirname)]
    }
  },
  preview: {
    host: 'localhost',
    port: 3000
  }
})
