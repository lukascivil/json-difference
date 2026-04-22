import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import nxPlugin from '@nx/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import jestPlugin from 'eslint-plugin-jest'
import * as jsoncParser from 'jsonc-eslint-parser'

export const ignores = {
  ignores: ['**/dist/**', '**/dist.browser/**', '**/bin/**', '**/node_modules/**', '**/coverage/**', '.nx/**']
}

export const tsBase = {
  files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: {
    '@typescript-eslint': tsPlugin,
    '@nx': nxPlugin,
    prettier: prettierPlugin,
    jest: jestPlugin
  },
  rules: {
    ...tsPlugin.configs.recommended.rules,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': 'off',
    'prefer-const': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@nx/enforce-module-boundaries': [
      'error',
      {
        depConstraints: [
          {
            sourceTag: 'scope:shared',
            onlyDependOnLibsWithTags: ['scope:shared']
          },
          {
            sourceTag: 'scope:playground',
            onlyDependOnLibsWithTags: ['scope:shared', 'scope:playground']
          },
          {
            sourceTag: 'scope:example',
            onlyDependOnLibsWithTags: ['scope:shared', 'scope:example']
          },
          {
            sourceTag: 'type:feature',
            onlyDependOnLibsWithTags: ['type:feature']
          }
        ]
      }
    ]
  }
}

export const packageJsonBase = {
  files: ['**/package.json'],
  languageOptions: { parser: jsoncParser },
  plugins: { '@nx': nxPlugin }
}

export default [ignores, tsBase]
