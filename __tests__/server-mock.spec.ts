import { expect } from "@playwright/test"
import { HttpResponse } from "msw"

import { exampleGenerator } from "@/test/data-generators"

import test from "./fixtures/next-fixture"

test("Our examples from SSR are rendered.", async ({
  page,
  port,
  http,
  requestInterceptor,
}) => {
  const mockedExamples = Array.from({ length: 1 }, exampleGenerator)

  requestInterceptor.use(
    http.get("https://basecamp.proxy.beeceptor.com/api/examples", () =>
      HttpResponse.json(mockedExamples),
    ),
  )
  await page.goto(`http://localhost:${port}/ssr-examples`)

  await expect(
    page.getByRole("heading", { name: "SSR Examples Page" }),
  ).toBeVisible()

  await Promise.all(
    mockedExamples.map(async (example) => {
      await expect(
        page.getByRole("heading", { name: example.title }),
      ).toBeVisible()
    }),
  )
})
