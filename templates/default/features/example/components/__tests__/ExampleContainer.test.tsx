import { HttpResponse, http } from "msw"

import { exampleGenerator } from "../../../../test/data-generators"
import { server } from "../../../../test/server"
import { renderWithProviders, screen, waitFor } from "../../../../test/utils"
import { Example } from "../../../../types"

import { ExampleContainer } from ".."

test("ExampleContainer displays loading state", async () => {
  renderWithProviders(<ExampleContainer exampleId="123" />)

  expect(screen.getByText("Loading...")).toBeInTheDocument()
})

test("ExampleContainer displays error state", async () => {
  server.use(
    http.get("/api/example/123", () =>
      HttpResponse.json({ error: "Bad Error" }, { status: 500 }),
    ),
  )

  renderWithProviders(<ExampleContainer exampleId="123" />)

  await waitFor(() => {
    expect(screen.getByText("Error...")).toBeInTheDocument()
  })
})

test("ExampleContainer displays not found state", async () => {
  server.use(http.get("/api/example/123", () => HttpResponse.json(undefined)))

  renderWithProviders(<ExampleContainer exampleId="123" />)

  await waitFor(() => {
    expect(screen.getByText("Not Found...")).toBeInTheDocument()
  })
})

test("ExampleContainer display fetched example", async () => {
  server.use(
    http.get("/api/example/123", () =>
      HttpResponse.json<Example>(
        exampleGenerator({ title: "Really Cool Title" }),
      ),
    ),
  )

  renderWithProviders(<ExampleContainer exampleId="123" />)

  await waitFor(() => {
    expect(screen.getByText("Really Cool Title")).toBeInTheDocument()
  })
})
