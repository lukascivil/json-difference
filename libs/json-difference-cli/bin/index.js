#!/usr/bin/env node

const yargs = require('yargs')
const { getDiff } = require('json-difference')

const options = yargs
  .usage('Usage: -o <original> -m <modified>')
  .option('o', { alias: 'original', describe: 'Json 1', type: 'string', demandOption: true })
  .option('m', { alias: 'modified', describe: 'Json 2', type: 'string', demandOption: true }).argv

const delta = getDiff(options.original, options.modified)

console.log('delta ->', delta)
