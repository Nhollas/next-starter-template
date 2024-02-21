import { Locator, expect } from "@playwright/test";

import { exampleGenerator } from "@/test/data-generators";
import test from "../../fixtures/next-fixture";

test("We can duplicate our examples", async ({ page, port }) => {
  const mockedExamples = Array.from({ length: 3 }, exampleGenerator);

  await page.route("*/**/api/examples", async (route) => {
    const response = await route.fetch();

    await route.fulfill({ response, json: mockedExamples });
  });

  await page.goto(`http://localhost:${port}/csr-examples`);
  await page.waitForResponse("**/api/examples");

  const exampleToDuplicate = mockedExamples[0];

  if (!exampleToDuplicate) {
    throw new Error("No example to duplicate");
  }

  const form = page.getByTestId(`example-card-${exampleToDuplicate.id}`);

  await form.getByRole("button", { name: "Duplicate" }).click();

  await page.waitForResponse("**/api/example/duplicate");

  expect(
    await page.getByRole("heading", { name: exampleToDuplicate?.title }).all(),
  ).toHaveLength(2);

  expect(
    await page.getByText(exampleToDuplicate.description).all(),
  ).toHaveLength(2);

  const forms = await page.getByTestId(/example-card-/i).all();

  const lastForm = forms[forms.length - 1] as Locator;

  await expect(
    lastForm.getByRole("heading", { name: exampleToDuplicate.title }),
  ).toBeVisible();

  await expect(
    lastForm.getByText(exampleToDuplicate.description),
  ).toBeVisible();
});
