import * as core from '@actions/core'
import {getConfig} from './config'
import {downloadToolFromManifest} from '@conventional-actions/toolkit'

async function run(): Promise<void> {
  try {
    const config = await getConfig()

    await downloadToolFromManifest(
      'go-staticcheck',
      'staticcheck',
      config.version,
      config.github_token,
      'staticcheck'
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
