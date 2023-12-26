import dynamic from "next/dynamic"

import { serverEnv } from "@/lib/env"

import Loading from "./loading"

const AsyncLDProvider = dynamic(
  () => import("@/components/AsyncWithLDProvider"),
  {
    loading: Loading,
    ssr: false,
  },
)
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AsyncLDProvider clientSideID={serverEnv().LAUNCHDARKLY_CLIENT_ID}>
      {children}
    </AsyncLDProvider>
  )
}
