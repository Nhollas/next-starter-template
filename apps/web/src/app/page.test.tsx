import { renderWithProviders, resolveComponent, screen } from "@/test/utils"

import Home from "./page"

test("Our page has the title of 'Nextjs Starter Template'", async () => {
  const HomePageResolved = await resolveComponent(Home, {
    language: "es",
    country: "ES",
  })
  renderWithProviders(<HomePageResolved />)

  expect(screen.getByText("Nextjs Starter Template")).toBeInTheDocument()

  expect(
    screen.getByText("Start building your project without faff."),
  ).toBeInTheDocument()
})
