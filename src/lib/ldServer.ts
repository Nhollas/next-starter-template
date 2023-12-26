/* eslint-disable */
import LaunchDarkly, { LDClient, LDContext } from "launchdarkly-node-server-sdk"

let launchDarklyServerClient: LDClient | undefined = undefined

async function initialize() {
  const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY as string)
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

export default { getClient, getVariation }
