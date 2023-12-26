import Home from "@/app/page"
import { renderWithProviders, resolveComponent, screen } from "@/test/utils"

test("Our page has the title of 'Nextjs Starter Template'", async () => {
  const HomeResolved = await resolveComponent(Home, {
    language: "es",
    country: "ES",
  })
  renderWithProviders(<HomeResolved />)

  expect(screen.getByText("Nextjs Starter Template")).toBeInTheDocument()
})
