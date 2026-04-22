import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import { ignores, tsBase, packageJsonBase } from '../../eslint.config.mjs'

export default [
  ignores,
  tsBase,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin
    },
    rules: {
      ...(reactHooksPlugin.configs?.recommended?.rules ?? {}),
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  },
  {
    ...packageJsonBase,
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['apps/playground/vite.config.ts', 'apps/playground/eslint.config.mjs']
        }
      ]
    }
  }
]
