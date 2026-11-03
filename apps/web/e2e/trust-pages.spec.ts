import { expect, test } from "@playwright/test";

const ld = async (page: import("@playwright/test").Page) =>
  (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");

test("About page names the firm, MahaRERA number and office, with AboutPage data", async ({ page }) => {
  const res = await page.goto("/about");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("About Nexus Horizon Advisors");
  await expect(page.locator("main")).toContainText("A031262605250");
  await expect(page.locator("main")).toContainText("Bavdhan");
  for (const s of ["new-projects", "ready-to-move", "resale", "commercial"]) {
    await expect(page.locator(`main a[href="/services/${s}"]`).first()).toBeAttached();
  }
  expect(await ld(page)).toContain('"AboutPage"');
});

test("How we work explains the steps and that consultations are free, without fee amounts", async ({ page }) => {
  await page.goto("/how-we-work");
  await expect(page.locator("h1")).toHaveText("How we work");
  await expect(page.locator('ol[aria-label="Steps"] > li')).toHaveCount(4);
  const main = page.locator("main");
  await expect(main).toContainText("Consultations are always free");
  await expect(main).not.toContainText(/\d(\.\d)?\s?%\s*(brokerage|commission|fee)/i);
  expect(await ld(page)).toContain('"FAQPage"');
});

test("FAQ page groups questions and links each group to its page", async ({ page }) => {
  await page.goto("/faq");
  await expect(page.locator("h1")).toHaveText("Frequently asked questions");
  await expect(page.getByRole("heading", { level: 2, name: "Working with us" })).toBeVisible();
  for (const name of ["New Project Advisory", "Ready-to-Move Properties", "Resale & Secondary Market", "Commercial & Office Spaces"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  expect(await page.locator("main details").count()).toBeGreaterThanOrEqual(15);
  const data = await ld(page);
  expect((data.match(/"FAQPage"/g) ?? []).length).toBe(1);
});

test("footer links to the trust pages", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  for (const [name, href] of ([
    ["About us", "/about"],
    ["How we work", "/how-we-work"],
    ["FAQs", "/faq"],
  ] as const)) {
    await expect(footer.getByRole("link", { name, exact: true })).toHaveAttribute("href", href);
  }
});
