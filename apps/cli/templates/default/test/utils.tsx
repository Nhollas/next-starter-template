import { QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { queryClient } from "@/lib/react-query";

export * from "@testing-library/react";

export async function resolveComponent(Component: any, props: any) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}

export function renderWithProviders(children: React.ReactNode) {
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  );
}
