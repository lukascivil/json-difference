import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/playground',
  plugins: [react()],
  resolve: { tsconfigPaths: true },
  base: '/json-difference'
})
