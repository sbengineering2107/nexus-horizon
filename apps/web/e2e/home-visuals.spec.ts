import { expect, test } from "@playwright/test";

test("hero shows a described photo", async ({ page }) => {
  await page.goto("/");
  const img = page.locator("section").first().locator("img").first();
  await expect(img).toBeVisible();
  expect((await img.getAttribute("alt"))?.length ?? 0).toBeGreaterThan(10);
});

test("choosing a service in the hero card pre-fills WhatsApp with it", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByTestId("hero-enquiry");
  await expect(cta).toHaveText("Book a free consultation");
  await page.getByRole("button", { name: "Resale & Secondary Market" }).click();
  await expect(page.getByRole("button", { name: "Resale & Secondary Market" })).toHaveAttribute("aria-pressed", "true");
  await expect(cta).toHaveAttribute("href", /resale%20flat/);
});

test("service cards on home show photos and link to service pages", async ({ page }) => {
  await page.goto("/");
  const card = page.locator('#services a[href="/services/resale"]');
  await expect(card.locator("img")).toBeAttached();
});

test("footer says images are illustrative", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("footer")).toContainText("Images are illustrative");
});
