import { faker } from "@faker-js/faker"
import { HttpResponse, http } from "msw"

import { NextApiClient } from "@/app/lib/clients/next-api-client"
import { exampleGenerator } from "@/test/data-generators"
import { server, withJsonBody } from "@/test/server"
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
  within,
} from "@/test/utils"

import Page from "../page"

global.window.HTMLElement.prototype.scrollIntoView = function () {}

it("Successfully duplicating an example:", async () => {
  const exampleToDuplicate = exampleGenerator()

  server.use(
    http.get(NextApiClient.createUrl("/examples"), () =>
      HttpResponse.json([exampleToDuplicate, exampleGenerator()]),
    ),
  )

  renderWithProviders(<Page />)

  // [1] We should start the duplication of an example card with a button.
  await waitFor(() => {
    const parentElement = screen.getByTestId(
      `example-card-${exampleToDuplicate.id}`,
    )
    const duplicateButton = within(parentElement).getByRole("button", {
      name: "Duplicate",
    })

    expect(duplicateButton).toBeInTheDocument()
  })

  server.use(
    http.post(
      NextApiClient.createUrl("/example/duplicate"),
      withJsonBody(exampleToDuplicate, () => {
        return HttpResponse.json(
          exampleGenerator({
            ...exampleToDuplicate,
            id: faker.string.uuid(),
          }),
        )
      }),
    ),
  )

  // [2] We should be able to see the duplicated example card after clicking the button.
  fireEvent.click(
    within(
      screen.getByTestId(`example-card-${exampleToDuplicate.id}`),
    ).getByRole("button", {
      name: "Duplicate",
    }),
  )

  // [3] The duplicated example card should have the same content as the original example card.
  await waitFor(() => {
    expect(
      screen.getAllByRole("heading", { name: exampleToDuplicate.title }),
    ).toHaveLength(2)
  })

  expect(screen.getAllByText(exampleToDuplicate.description)).toHaveLength(2)

  const headings = screen.getAllByRole("heading", {
    name: exampleToDuplicate.title,
  })
  expect(headings).toHaveLength(2)

  const cards = screen.getAllByTestId(/example-card-/i)
  const lastCard = cards[cards.length - 1]!

  // [4] The duplicated example card should be placed at the end of the list of example cards.
  expect(
    within(lastCard).getByRole("heading", {
      name: exampleToDuplicate.title,
    }),
  ).toBeInTheDocument()

  expect(
    within(lastCard).getByText(exampleToDuplicate.description),
  ).toBeInTheDocument()
})
