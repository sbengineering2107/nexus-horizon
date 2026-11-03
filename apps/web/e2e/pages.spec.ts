import { expect, test } from "@playwright/test";

const SERVICES = ["new-projects", "ready-to-move", "resale", "commercial"];

test("home has one h1 and links to every service page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  for (const slug of SERVICES) {
    await expect(page.locator(`main a[href="/services/${slug}"]`).first()).toBeAttached();
  }
});

test("services hub lists every service", async ({ page }) => {
  const res = await page.goto("/services");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  for (const slug of SERVICES) {
    await expect(page.locator(`main a[href="/services/${slug}"]`).first()).toBeAttached();
  }
});

for (const slug of SERVICES) {
  test(`service page /services/${slug} renders with FAQs and structured data`, async ({ page }) => {
    const res = await page.goto(`/services/${slug}`);
    expect(res?.status()).toBe(200);
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).not.toBeEmpty();
    await expect(page.getByRole("heading", { name: "Frequently asked questions" })).toBeVisible();
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.some((t) => t.includes('"FAQPage"'))).toBe(true);
    expect(ld.some((t) => t.includes('"BreadcrumbList"'))).toBe(true);
    const wa = page.locator('main a[href^="https://wa.me/"]').first();
    const words = { "new-projects": "under-construction", "ready-to-move": "ready-to-move", resale: "resale flat", commercial: "commercial" }[slug]!;
    await expect(wa).toHaveAttribute("href", new RegExp(encodeURIComponent(words)));
  });
}

test("unknown service returns the 404 page with a link home", async ({ page }) => {
  const res = await page.goto("/services/foo");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("Page not found");
  await expect(page.locator('main a[href="/"]')).toBeAttached();
});
