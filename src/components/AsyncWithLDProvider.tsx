"use client"

import { LDContext, asyncWithLDProvider } from "launchdarkly-react-client-sdk"
import { use } from "react"

const defaultContext = {
  kind: "user",
  key: "user-key-123abc",
  name: "Sandy Smith",
}

export default function AsyncLDProvider({
  children,
  context = defaultContext,
  clientSideID,
}: {
  children: React.ReactNode
  context?: LDContext
  clientSideID: string
}) {
  const LDDynaProvider = use(
    asyncWithLDProvider({
      clientSideID,
      context,
    }),
  )
  return <LDDynaProvider>{children}</LDDynaProvider>
}
