#!/usr/bin/env node

import yargs from 'yargs'
import { getDiff } from 'json-difference'

const options = yargs
  .usage('Usage: -o <original> -m <modified>')
  .option('o', { alias: 'original', describe: 'Json 1', type: 'string', demandOption: true })
  .option('m', { alias: 'modified', describe: 'Json 2', type: 'string', demandOption: true }).argv

const delta = getDiff((options as any)?.original, (options as any).modified)

console.log('delta ->', delta)
