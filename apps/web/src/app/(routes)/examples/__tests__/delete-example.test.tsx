import { HttpResponse, http } from "msw"

import { NextApiClient } from "@/app/lib/clients/next-api-client"
import { exampleGenerator } from "@/test/data-generators"
import { server } from "@/test/server"
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
  within,
} from "@/test/utils"

import Page from "../page"

it("Successfully deleting an example:", async () => {
  const exampleToDelete = exampleGenerator()

  server.use(
    http.get(NextApiClient.createUrl("/examples"), () =>
      HttpResponse.json([exampleToDelete, exampleGenerator()]),
    ),
    http.delete(NextApiClient.createUrl(`/example/${exampleToDelete.id}`), () =>
      HttpResponse.json({}, { status: 200 }),
    ),
  )

  renderWithProviders(<Page />)

  // [1] We should start the deletion of an example card with a button.
  await waitFor(() => {
    const parentElement = screen.getByTestId(
      `example-card-${exampleToDelete.id}`,
    )
    const deleteButton = within(parentElement).getByRole("button", {
      name: "Delete Example",
    })

    expect(deleteButton).toBeInTheDocument()
  })

  // [2] We should be prompted with a modal asking to confirm that we want to delete the example.
  fireEvent.click(
    within(screen.getByTestId(`example-card-${exampleToDelete.id}`)).getByRole(
      "button",
      {
        name: "Delete Example",
      },
    ),
  )

  await waitFor(() => {
    const modal = screen.getByRole("alertdialog", {
      name: "Are you sure you want to delete this example?",
    })
    expect(modal).toBeInTheDocument()
  })

  // [3] We will then need to confirm the deletion of the example.
  fireEvent.click(screen.getByRole("button", { name: "Confirm" }))

  // [4] The deleted example card should be removed from the list of example cards.
  await waitFor(() => {
    expect(
      screen.queryByRole("heading", { name: exampleToDelete.title }),
    ).not.toBeInTheDocument()
  })
})
