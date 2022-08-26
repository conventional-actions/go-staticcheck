import * as core from '@actions/core'
import * as exec from '@actions/exec'
import {parseInputFiles} from './utils'

async function run(): Promise<void> {
  try {
    const format = core.getInput('format') || 'stylish'
    const checks = parseInputFiles(core.getInput('checks') || 'all')
    const tags = parseInputFiles(core.getInput('tags'))
    const pkg = core.getInput('package') || './...'

    let args: string[] = ['-f', format]
    if (checks && checks.length) {
      args = args.concat('-checks', checks.join(','))
    }

    if (tags && tags.length) {
      args = args.concat('-tags', tags.join(','))
    }

    args = args.concat(pkg)

    await exec.exec('staticcheck', args)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
