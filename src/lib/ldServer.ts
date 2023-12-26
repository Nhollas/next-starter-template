import LaunchDarkly, { LDClient, LDContext } from "launchdarkly-node-server-sdk"

import { serverEnv } from "./env"

let launchDarklyServerClient: LDClient | undefined = undefined

async function initialize() {
  const client = LaunchDarkly.init(serverEnv().LAUNCHDARKLY_SDK_KEY)
  launchDarklyServerClient = await client.waitForInitialization()

  return launchDarklyServerClient
}

const getClient = async () => {
  return launchDarklyServerClient ? launchDarklyServerClient : initialize()
}

const getVariation = async (
  flagKey: string,
  context: LDContext,
  defaultValue: any,
) => {
  const ldClient = await getClient()
  return ldClient.variation(flagKey, context, defaultValue)
}

const ldServer = { getClient, getVariation }

export default ldServer
