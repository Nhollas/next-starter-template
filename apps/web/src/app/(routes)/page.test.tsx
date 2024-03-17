import { renderWithProviders, resolveComponent, screen } from "@/test/utils"

import Home from "./page"

test("Our page has the title of 'Nextjs Starter Template'", async () => {
  const ResolvedHome = await resolveComponent(Home)

  renderWithProviders(<ResolvedHome />)

  expect(screen.getByText("Nextjs Starter Template")).toBeInTheDocument()

  expect(
    screen.getByText("Start building your project without faff."),
  ).toBeInTheDocument()
})
