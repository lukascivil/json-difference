// Packages
import { getDiff, Delta } from '@json-difference'
import * as fs from 'fs'
import * as path from 'path'

const oldJson = JSON.parse(fs.readFileSync(path.join(__dirname, './assets/oldJson.json'), 'utf8'))
const newJson = JSON.parse(fs.readFileSync(path.join(__dirname, './assets/newJson.json'), 'utf8'))

const start = new Date()

const delta: Delta = getDiff(oldJson, newJson)

console.log('diff', JSON.stringify(delta))

const end = new Date()
const diffTime = Number(end) - Number(start)

console.info('Execution time: %dms', diffTime)
