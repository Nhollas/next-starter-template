import { expect } from "@playwright/test";
import { HttpResponse } from "msw";

import { serverEnv } from "@/lib/env";

import { exampleGenerator } from "@/test/data-generators";

import test from "./fixtures/next-fixture";

const { EXAMPLE_CLIENT_URL } = serverEnv();

test("Our examples from SSR are rendered.", async ({
  page,
  port,
  http,
  requestInterceptor,
  enablePreviewMode,
}) => {
  const mockedExamples = Array.from({ length: 1 }, exampleGenerator);

  requestInterceptor.use(
    http.get(`${EXAMPLE_CLIENT_URL}/api/examples`, () =>
      HttpResponse.json(mockedExamples),
    ),
  );
  const disablePreview = await enablePreviewMode(page);
  await page.goto(`http://localhost:${port}/ssr-examples`);

  await expect(
    page.getByRole("heading", { name: "SSR Examples Page" }),
  ).toBeVisible();

  await Promise.all(
    mockedExamples.map(async (example) => {
      await expect(
        page.getByRole("heading", { name: example.title }),
      ).toBeVisible();
    }),
  );

  await disablePreview();
});
