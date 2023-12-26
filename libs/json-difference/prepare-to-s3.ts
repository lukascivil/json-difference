// Packages
import * as path from 'path'
import fs from 'fs'

const version: string = JSON.parse(fs.readFileSync('libs/json-difference/dist.browser/package.json', 'utf-8')).version
const currentDir = path.resolve(path.join(__dirname))
const dir = path.resolve(path.join(__dirname, `dist.browser-${version}`))

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

fs.cpSync(`${currentDir}/dist.browser`, dir, { recursive: true })

fs.rmSync(`${currentDir}/dist.browser`, { recursive: true, force: true })
