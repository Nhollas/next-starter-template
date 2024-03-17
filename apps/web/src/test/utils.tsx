import "@testing-library/jest-dom"
import { render } from "@testing-library/react"

import { Providers } from "@/app/providers"

export * from "@testing-library/react"

export async function resolveComponent<T extends object>(
  Component: (props: T) => Promise<JSX.Element>,
  props: T = {} as T,
): Promise<() => JSX.Element> {
  const resolvedComp = await Component(props)
  return () => resolvedComp
}

export function renderWithProviders(children: React.ReactNode) {
  return render(<Providers>{children}</Providers>)
}
