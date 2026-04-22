import reactHooksPlugin from 'eslint-plugin-react-hooks'
import { ignores, tsBase, packageJsonBase } from '../../eslint.config.mjs'

export default [
  ignores,
  tsBase,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      'react-hooks': reactHooksPlugin
    },
    rules: {
      ...reactHooksPlugin.configs?.recommended?.rules
    }
  },
  {
    ...packageJsonBase,
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['apps/example/eslint.config.mjs']
        }
      ]
    }
  }
]
