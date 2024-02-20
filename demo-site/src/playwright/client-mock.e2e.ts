import { expect } from "@playwright/test"

import { exampleGenerator } from "../test/data-generators"

import test from "./fixtures/next-fixture"

test("Our examples from CSR are rendered.", async ({ page, port }) => {
  const mockedExamples = Array.from({ length: 1 }, exampleGenerator)

  await page.route("*/**/api/examples", async (route) => {
    const response = await route.fetch()

    await route.fulfill({ response, json: mockedExamples })
  })

  await page.goto(`http://localhost:${port}/csr-examples`)
  await page.waitForResponse("**/api/examples")

  await Promise.all(
    mockedExamples.map(async (example) => {
      await expect(
        page.getByRole("heading", { name: example.title }),
      ).toBeVisible({ timeout: 1000 })
    }),
  )
})
