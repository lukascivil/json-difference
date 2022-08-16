import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: { lib: { entry: resolve(__dirname, 'src/core/index.ts'), name: 'json-difference' }, outDir: './dist.browser' },
  plugins: [tsconfigPaths({ projects: ['tsconfig.browser.json'] })]
});
