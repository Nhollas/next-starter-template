import QueryClientProvider from "./QueryClientProvider"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider>{children}</QueryClientProvider>
}

export default Providers
