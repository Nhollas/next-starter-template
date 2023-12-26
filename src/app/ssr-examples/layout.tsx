import dynamic from "next/dynamic"

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
    <AsyncLDProvider
      clientSideID={process.env.NEXT_PUBLIC_LAUNCHDARKLY_CLIENT_ID as string}
    >
      {children}
    </AsyncLDProvider>
  )
}
