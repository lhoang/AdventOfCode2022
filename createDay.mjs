#!/usr/bin/env zx
/**
 * Install
 * ```
 *   pnpm i -g zx
 *   chmod +x createDay.mjs
 * ```
 */

// Add your own cookie in var cookie.
import {cookie} from "./cookie.mjs"

const year = '2021'
const url = `https://adventofcode.com/${year}/day/`
$.verbose = false
console.log('Create a new day structure')
const dayAnswer = await question(chalk.green('Which day? '))
const day = (+dayAnswer).toString().padStart(2, '0')

const newDir = `./src/${year}/day${day}`;
const alreadyExists = await fs.pathExists(newDir)

if (Number.isNaN(day) || alreadyExists) {
  console.log(chalk.red(`This day ${day} already exists (or day is invalid)`))
  process.exit()
}

// Create dir and files
await fs.mkdirp(newDir)
console.log(`${newDir} created`)
const name = await question(chalk.green('Name? '))
const filePath = newDir + '/' + name
await fs.ensureFile(filePath + '.ts')
await fs.ensureFile(filePath + '.spec.ts')
console.log(`${name} files created`)

// Download input
const aocUrl = url + (+day) + '/input'

const response = await fetch(aocUrl, {
  "credentials": "include",
  headers: {
    Cookie: cookie,
  },
  "method": "GET",
  "mode": "cors",
})
const content = await response.text()
fs.writeFile(newDir + '/input.txt', content)