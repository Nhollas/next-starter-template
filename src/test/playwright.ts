import { Page } from "@playwright/test"

export function waitForAnimationEnd(page: Page, selector: string) {
  return page
    .locator(selector)
    .evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    )
}
