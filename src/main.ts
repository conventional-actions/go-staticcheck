import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {parseInputFiles} from './utils'
import * as fs from 'fs'

async function run(): Promise<void> {
  try {
    const outputPath = core.getInput('output_path') || 'staticcheck.sarif'
    const format = core.getInput('format') || 'stylish'
    const checks = parseInputFiles(core.getInput('checks') || 'all')
    const tags = parseInputFiles(core.getInput('tags'))
    const packages = parseInputFiles(core.getInput('package') || './...')

    let args: string[] = ['-f', format]
    if (checks && checks.length) {
      args = args.concat('-checks', checks.join(','))
    }

    if (tags && tags.length) {
      args = args.concat('-tags', tags.join(','))
    }

    for (const pkg of packages) {
      const output = await exec.getExecOutput('staticcheck', args.concat(pkg), {
        silent: true
      })
      fs.writeFileSync(outputPath, output.stdout)
      core.setOutput('output_path', outputPath)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
