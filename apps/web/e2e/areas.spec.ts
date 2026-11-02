import { expect, test } from "@playwright/test";

test("Pune hub groups 28 area pages under West and East", async ({ page }) => {
  const res = await page.goto("/pune");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 2, name: "West Pune", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "East Pune", exact: true })).toBeVisible();
  await expect(page.locator('main a[href^="/pune/"]')).toHaveCount(28);
});

test("an area page has a guide, structured data, nearby links and an area enquiry", async ({ page }) => {
  const res = await page.goto("/pune/baner");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toContainText("Baner");
  const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");
  expect(ld).toContain('"Place"');
  expect(ld).toContain('"FAQPage"');
  expect(ld).toContain('"BreadcrumbList"');
  await expect(page.locator('main a[href*="wa.me"][href*="in%20Baner"]').first()).toBeAttached();
  expect(await page.locator('main nav[aria-label="Nearby areas"] a[href^="/pune/"]').count()).toBeGreaterThanOrEqual(2);
});

test("unknown area returns 404", async ({ page }) => {
  const res = await page.goto("/pune/foo");
  expect(res?.status()).toBe(404);
});

test("home section links every West and East area page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('#areas [data-zone="west"] a[href^="/pune/"]')).toHaveCount(15);
  await expect(page.locator('#areas [data-zone="east"] a[href^="/pune/"]')).toHaveCount(13);
});
