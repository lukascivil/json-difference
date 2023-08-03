const libName = 'json-difference'
const libPath = '.'
const importPath = `@monorepo/${libName}`

module.exports = {
  name: libName,
  pkgRoot: `./`,
  tagFormat: libName + '-v${version}',
  commitPaths: [`${libPath}/*`],
  assets: [`${libPath}/README.md`, `${libPath}/CHANGELOG.md`],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `${libPath}/CHANGELOG.md`
      }
    ],
    ['semantic-release-yarn', { pkgRoot: '.', mainWorkspace: '@monorepo/root' }],
    [
      '@semantic-release/exec',
      {
        prepareCmd: `PACKAGE_NAME=${importPath} VERSION=\${nextRelease.version} yarn run update-deps && VERSION=\${nextRelease.version} yarn run bump-version`
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: [`${libPath}/package.json`, `${libPath}/CHANGELOG.md`],
        message: `chore(release): ${libName}` + '-v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ]
  ]
}
