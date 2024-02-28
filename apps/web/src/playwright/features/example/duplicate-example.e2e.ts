import { Locator, expect } from "@playwright/test"

import test from "@/playwright/fixtures/next-fixture"
import { exampleGenerator } from "@/test/data-generators"

test("We can duplicate our examples", async ({ page }) => {
  const mockedExamples = Array.from({ length: 3 }, exampleGenerator)

  await page.route("*/**/api/examples", async (route) => {
    const response = await route.fetch()

    await route.fulfill({ response, json: mockedExamples })
  })

  await page.goto(`/csr-examples`)
  await page.waitForResponse("**/api/examples")

  const exampleToDuplicate = mockedExamples[0]

  // eslint-disable-next-line playwright/no-conditional-in-test
  if (!exampleToDuplicate) {
    throw new Error("No example to duplicate")
  }

  const form = page.getByTestId(`example-card-${exampleToDuplicate.id}`)

  await form.getByRole("button", { name: "Duplicate" }).click()

  await page.waitForResponse("**/api/example/duplicate")

  expect(
    await page.getByRole("heading", { name: exampleToDuplicate?.title }).all(),
  ).toHaveLength(2)

  expect(
    await page.getByText(exampleToDuplicate.description).all(),
  ).toHaveLength(2)

  const forms = await page.getByTestId(/example-card-/i).all()

  const lastForm = forms[forms.length - 1] as Locator

  await expect(
    lastForm.getByRole("heading", { name: exampleToDuplicate.title }),
  ).toBeVisible()

  await expect(lastForm.getByText(exampleToDuplicate.description)).toBeVisible()
})
