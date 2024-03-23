import { expect } from "@playwright/test"

import test from "@/playwright/fixtures/next-fixture"
import { exampleGenerator } from "@/test/data-generators"

test("We can duplicate our examples", async ({ page }) => {
  const exampleToDuplicate = exampleGenerator()

  await page.route("*/**/api/examples", async (route) => {
    const response = await route.fetch()

    await route.fulfill({ response, json: [exampleToDuplicate] })
  })

  await page.goto(`/examples`)

  const form = page.getByTestId(`example-card-${exampleToDuplicate.id}`)

  await form.getByRole("button", { name: "Duplicate" }).click()

  expect(
    await page.getByRole("heading", { name: exampleToDuplicate.title }).all(),
  ).toHaveLength(2)

  expect(
    await page.getByText(exampleToDuplicate.description).all(),
  ).toHaveLength(2)

  const forms = await page.getByTestId(/example-card-/i).all()

  const lastForm = forms[forms.length - 1]!

  await expect(
    lastForm.getByRole("heading", { name: exampleToDuplicate.title }),
  ).toBeVisible()

  await expect(lastForm.getByText(exampleToDuplicate.description)).toBeVisible()
})
