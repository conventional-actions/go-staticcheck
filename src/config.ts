import * as core from '@actions/core'
import {parseMultiInput} from '@conventional-actions/toolkit'

type Config = {
  version: string
  github_token: string
  outputPath: string
  format: string
  checks: string[]
  tags: string[]
  packages: string[]
}

export async function getConfig(): Promise<Config> {
  return {
    version: core.getInput('version') || 'latest',
    github_token: process.env['GITHUB_TOKEN'] || '',
    outputPath: core.getInput('output_path') || 'staticcheck.sarif',
    format: core.getInput('format') || 'stylish',
    checks: parseMultiInput(core.getInput('checks') || 'all'),
    tags: parseMultiInput(core.getInput('tags')),
    packages: parseMultiInput(core.getInput('package') || './...')
  }
}
