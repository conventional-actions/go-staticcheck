import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as fs from 'fs'
import {getConfig} from './config'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    let args: string[] = ['-f', config.format]
    if (config.checks && config.checks.length) {
      args = args.concat('-checks', config.checks.join(','))
    }

    if (config.tags && config.tags.length) {
      args = args.concat('-tags', config.tags.join(','))
    }

    for (const pkg of config.packages) {
      const output = await exec.getExecOutput('staticcheck', args.concat(pkg), {
        silent: true
      })
      fs.writeFileSync(config.outputPath, output.stdout)
      core.setOutput('output_path', config.outputPath)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
