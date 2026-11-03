import { expect, test } from "@playwright/test";

test("header shows the approved logo image", async ({ page }) => {
  await page.goto("/");
  const logo = page.locator("header img[alt='Nexus Horizon Advisors']");
  await expect(logo).toBeVisible();
  expect(await logo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
});

test("footer shows the badge icon from the kit", async ({ page }) => {
  await page.goto("/");
  const badge = page.locator("footer img[data-brand='badge']");
  await badge.scrollIntoViewIfNeeded();
  await expect(badge).toBeVisible();
  await expect.poll(() => badge.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
});

test("favicons, apple touch icon and manifest come from the kit", async ({ page, request }) => {
  await page.goto("/");
  for (const href of await page.locator("link[rel~='icon'], link[rel='apple-touch-icon']").evaluateAll((ls) => ls.map((l) => l.getAttribute("href")!))) {
    expect((await request.get(href)).status(), href).toBe(200);
  }
  expect((await request.get("/favicon.ico")).status()).toBe(200);
  await expect(page.locator("link[rel='apple-touch-icon']")).toHaveCount(1);
  const manifest = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest.theme_color).toBe("#1B2A41");
  for (const icon of manifest.icons) expect((await request.get(icon.src)).status(), icon.src).toBe(200);
});

test("home page share image is the kit's 1200x630 image", async ({ page, request }) => {
  await page.goto("/");
  const og = await page.locator("meta[property='og:image']").getAttribute("content");
  expect(og).toMatch(/\/og-image\.png$/);
  const res = await request.get(new URL(og!).pathname);
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
});

test("theme uses the brand navy", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("meta[name='theme-color']")).toHaveAttribute("content", "#1B2A41");
  const footerBg = await page.locator("footer").evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(footerBg).not.toBe("rgb(10, 54, 50)");
});
