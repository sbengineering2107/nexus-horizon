import { expect, test } from "@playwright/test";

test("floating contact buttons do not cover the end of the footer", async ({ page, isMobile }) => {
  test.skip(!isMobile, "buttons only show on small screens");
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const lastLine = page.locator("footer").getByText(/© \d{4} Nexus Horizon Advisors/);
  await expect(lastLine).toBeInViewport();
  const text = (await lastLine.boundingBox())!;
  const buttons = (await page.getByTestId("floating-contact").boundingBox())!;
  expect(text.y + text.height).toBeLessThanOrEqual(buttons.y + 0.5);
});

test("page language is en-IN", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-IN");
});

test("non-production builds load no analytics scripts", async ({ page }) => {
  await page.goto("/");
  const srcs = await page.locator("script[src]").evaluateAll((s) => s.map((x) => x.getAttribute("src") ?? ""));
  expect(srcs.some((s) => /googletagmanager|clarity\.ms|speed-insights/.test(s))).toBe(false);
});
