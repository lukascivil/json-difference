import { getDiff } from 'json-difference'
import * as fs from 'fs'
import * as path from 'path'

const oldJson = JSON.parse(fs.readFileSync(path.join(__dirname, './assets/oldJson.json'), 'utf8'))
const newJson = JSON.parse(fs.readFileSync(path.join(__dirname, './assets/newJson.json'), 'utf8'))

const start: any = new Date()

getDiff(oldJson, newJson)

const end: any = new Date()
const diffTime = end - start

console.info('Execution time: %dms', diffTime)
