import { expect, test } from "@playwright/test";

test("mobile CTA bar shows Call and WhatsApp links", async ({ page }) => {
  await page.goto("/");
  const bar = page.getByTestId("mobile-cta-bar");
  await expect(bar).toBeVisible();
  const hrefs = await bar.locator("a").evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
  expect(hrefs).toHaveLength(2);
  expect(hrefs[0]).toMatch(/^tel:\+91\d{10}$/);
  expect(hrefs[1]).toMatch(/^https:\/\/wa\.me\/91\d{10}\?text=/);
});

test("mobile CTA bar does not cover the footer's last line", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  const maharera = page.getByTestId("maharera");
  await expect(maharera).toBeInViewport();
  const footerBox = await maharera.boundingBox();
  const barBox = await page.getByTestId("mobile-cta-bar").boundingBox();
  expect(footerBox && barBox).toBeTruthy();
  expect(footerBox!.y + footerBox!.height).toBeLessThanOrEqual(barBox!.y);
});

test("page language is en-IN", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en-IN");
});
