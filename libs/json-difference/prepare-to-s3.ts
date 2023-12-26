// Packages
import * as path from 'path'
import fs from 'fs'

const version: string = JSON.parse(fs.readFileSync('libs/json-difference/dist.browser/package.json', 'utf-8')).version
const currentDir = path.resolve(path.join(__dirname))
const tempDir = path.resolve(path.join(__dirname, `dist.browser-temp`))

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir)
}

fs.cpSync(`${currentDir}/dist.browser`, tempDir, { recursive: true })

fs.rmSync(`${currentDir}/dist.browser`, { recursive: true, force: true })

fs.cpSync(tempDir, `${currentDir}/dist.browser-s3/${version}`, { recursive: true })

fs.rmSync(tempDir, { recursive: true, force: true })
