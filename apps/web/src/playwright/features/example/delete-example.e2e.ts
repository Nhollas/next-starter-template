import { expect } from "@playwright/test"

import test from "@/playwright/fixtures/next-fixture"
import { exampleGenerator } from "@/test/data-generators"

test("We can delete our examples", async ({ page }) => {
  const mockedExamples = Array.from({ length: 1 }, exampleGenerator)

  await page.route("*/**/api/examples", async (route) => {
    const response = await route.fetch()

    await route.fulfill({ response, json: mockedExamples })
  })

  await page.goto(`/csr-examples`)
  await page.waitForResponse("**/api/examples")

  for (const example of mockedExamples) {
    const form = page.getByTestId(`example-card-${example.id}`)

    await form.getByRole("button", { name: "Delete Example" }).click()

    await page.getByRole("button", { name: "Confirm" }).click()

    await expect(form).toBeHidden()
  }
})
