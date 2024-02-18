import { render, screen } from "../../test/utils"

import { HomeCard } from "../home-card"

test("Has title of 'Nextjs Starter Template' and displays todays date", async () => {
  render(<HomeCard />)

  expect(screen.getByText(new Date().toDateString())).toBeInTheDocument()
  expect(screen.getByText("Nextjs Starter Template")).toBeInTheDocument()
})
