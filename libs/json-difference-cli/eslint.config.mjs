import { ignores, tsBase, packageJsonBase } from '../../eslint.config.mjs';

export default [
  ignores,
  tsBase,
  {
    ...packageJsonBase,
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['libs/json-difference-cli/eslint.config.mjs'],
        },
      ],
    },
  },
];
