import { expect } from "@playwright/test"

import test from "@/playwright/fixtures/next-fixture"
import { exampleGenerator } from "@/test/data-generators"

test("We can edit our examples", async ({ page }) => {
  const mockedExamples = Array.from({ length: 1 }, exampleGenerator)

  await page.route("*/**/api/examples", async (route) => {
    const response = await route.fetch()

    await route.fulfill({ response, json: mockedExamples })
  })
  await page.goto(`/examples`)

  for (const example of mockedExamples) {
    const form = page.getByTestId(`example-card-${example.id}`)

    await form.getByRole("button", { name: "Update Example" }).click()
    const updatedTitle = `Updated title @ ${Date.now()}`
    const updatedDescription = `Updated description @ ${Date.now()}`

    await form.getByRole("textbox", { name: "title" }).fill(updatedTitle)
    await form
      .getByRole("textbox", { name: "description" })
      .fill(updatedDescription)

    await form.getByRole("button", { name: "Save" }).click()

    await expect(
      form.getByRole("heading", { name: updatedTitle }),
    ).toBeVisible()

    await expect(form.getByText(updatedDescription)).toBeVisible()
  }
})
