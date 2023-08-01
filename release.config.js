module.exports = {
  branches: ['master'],
  preset: 'conventionalcommits',
  presetConfig: {
    types: [
      { type: 'feat', section: 'Features' },
      { type: 'fix', section: 'Bug Fixes' },
      { type: 'chore', section: 'Chores' },
      { type: 'docs', section: 'Documentation' },
      { type: 'style', section: 'Style' },
      { type: 'refactor', section: 'Refactoring' },
      { type: 'perf', section: 'Performance' },
      { type: 'test', section: 'Tests' }
    ]
  },
  releaseRules: [{ type: 'refactor', release: 'patch' }]
}
