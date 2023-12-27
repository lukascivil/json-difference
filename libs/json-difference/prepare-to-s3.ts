// Packages
import * as path from 'path'
import fs from 'fs'

const currentDir = path.resolve(path.join(__dirname))
const version: string = JSON.parse(fs.readFileSync(`${currentDir}/dist.browser/package.json`, 'utf-8')).version
const tempDir = path.resolve(path.join(__dirname, `dist.browser-temp`))

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir)
}

// Copy dist.browser -> dist.browser-temp
fs.cpSync(`${currentDir}/dist.browser`, tempDir, { recursive: true })

// Clear dist.browser
fs.rmSync(`${currentDir}/dist.browser`, { recursive: true, force: true })

// Copy dist.browser-temp -> dist.browser-s3
fs.cpSync(tempDir, `${currentDir}/dist.browser-s3/${version}`, { recursive: true })

// Clear dist.browser-temp
fs.rmSync(tempDir, { recursive: true, force: true })
