import { expect, test } from "@playwright/test";

const ld = async (page: import("@playwright/test").Page) =>
  (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");

test("blog index lists guides by category and links to each", async ({ page }) => {
  const res = await page.goto("/blog");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("Pune property guides");
  for (const name of ["Buying guides", "Costs and home loans", "Area comparisons", "Commercial and investment"]) {
    await expect(page.getByRole("link", { name, exact: true }).first()).toBeVisible();
  }
  expect(await page.locator('main a[href^="/blog/"]:not([href^="/blog/category"])').count()).toBeGreaterThanOrEqual(8);
});

test("a guide has its answer first, FAQs, sources and article structured data", async ({ page }) => {
  await page.goto("/blog");
  const href = await page.locator('main article a[href^="/blog/"]').first().getAttribute("href");
  await page.goto(href!);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByTestId("post-summary")).not.toBeEmpty();
  await expect(page.getByText("By Nexus Horizon team")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Frequently asked questions" })).toBeVisible();
  await expect(page.getByTestId("post-sources").locator("a")).not.toHaveCount(0);
  const data = await ld(page);
  expect(data).toContain('"BlogPosting"');
  expect(data).toContain('"FAQPage"');
  expect(data).toContain('"BreadcrumbList"');
  expect(data).toContain('"datePublished"');
});

test("guide tables render as tables", async ({ page }) => {
  await page.goto("/blog/total-cost-of-buying-a-flat-in-pune");
  await expect(page.locator("article table").first()).toBeVisible();
});

test("category page lists only its guides", async ({ page }) => {
  const res = await page.goto("/blog/category/area-comparisons");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toContainText("Area comparisons");
  expect(await page.locator('main article a[href^="/blog/"]').count()).toBeGreaterThanOrEqual(2);
  expect((await page.goto("/blog/category/nope"))?.status()).toBe(404);
});

test("RSS feed lists the guides", async ({ request }) => {
  const res = await request.get("/blog/rss.xml");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("xml");
  const xml = await res.text();
  expect((xml.match(/<item>/g) ?? []).length).toBeGreaterThanOrEqual(8);
});

test("home page shows the latest guides", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#guides");
  await expect(section.getByRole("heading", { level: 2 })).toBeVisible();
  expect(await section.locator('a[href^="/blog/"]').count()).toBeGreaterThanOrEqual(3);
});

test("a service page links to related guides", async ({ page }) => {
  await page.goto("/services/resale");
  await expect(page.getByRole("navigation", { name: "Related guides" }).locator('a[href^="/blog/"]')).not.toHaveCount(0);
});

test("WhatsApp from a guide mentions the guide", async ({ page }) => {
  await page.goto("/blog/baner-vs-wakad");
  const href = await page.getByRole("link", { name: "Chat on WhatsApp" }).getAttribute("href");
  expect(decodeURIComponent(href!.split("?text=")[1]!)).toContain("guide");
});
