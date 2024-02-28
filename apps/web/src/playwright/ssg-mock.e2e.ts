import { expect } from "@playwright/test"
import { HttpResponse } from "msw"

import { ExampleClient } from "@/lib/clients/example-client"
import { exampleGenerator } from "@/test/data-generators"

import test from "./fixtures/next-fixture"

test("Our examples from SSG are rendered.", async ({
  page,
  http,
  requestInterceptor,
  enablePreviewMode,
}) => {
  const mockedExamples = Array.from({ length: 1 }, exampleGenerator)

  requestInterceptor.use(
    http.get(ExampleClient.createUrl("/examples"), () =>
      HttpResponse.json(mockedExamples),
    ),
  )
  const disablePreview = await enablePreviewMode(page)

  await page.goto("/ssg-examples")

  await expect(
    page.getByRole("heading", { name: "SSG Examples Page" }),
  ).toBeVisible()

  await Promise.all(
    mockedExamples.map(async (example) => {
      await expect(
        page.getByRole("heading", { name: example.title }),
      ).toBeVisible()
    }),
  )

  await disablePreview()
})
