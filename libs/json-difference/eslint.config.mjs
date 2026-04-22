import { ignores, tsBase, packageJsonBase } from '../../eslint.config.mjs'

export default [
  ignores,
  tsBase,
  {
    ...packageJsonBase,
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            'libs/json-difference/vite.config.mts',
            'libs/json-difference/vite.config.browser.mts',
            'libs/json-difference/eslint.config.mjs'
          ]
        }
      ]
    }
  }
]
