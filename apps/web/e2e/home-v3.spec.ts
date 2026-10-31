import { expect, test } from "@playwright/test";

test.describe("full-width hero", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("photo spans the hero with the headline on top of it", async ({ page }) => {
    await page.goto("/");
    const hero = page.locator("main > section").first();
    const heroBox = (await hero.boundingBox())!;
    const imgBox = (await hero.locator("img").first().boundingBox())!;
    expect(imgBox.width).toBeGreaterThanOrEqual(heroBox.width - 1);
    const h1 = (await hero.locator("h1").boundingBox())!;
    expect(h1.y).toBeGreaterThanOrEqual(imgBox.y);
    expect(h1.y + h1.height).toBeLessThanOrEqual(imgBox.y + imgBox.height);
  });
});

test("how it works shows four illustrated step cards", async ({ page }) => {
  await page.goto("/");
  const steps = page.getByTestId("step-card");
  await expect(steps).toHaveCount(4);
  for (let i = 0; i < 4; i++) await expect(steps.nth(i).locator("svg").first()).toBeAttached();
});

test("service cards on home are large", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const img = page.locator('#services a[href="/services/resale"] img');
  const box = (await img.boundingBox())!;
  expect(box.width).toBeGreaterThanOrEqual(480);
});

test("calculators section shows six infographic cards", async ({ page }) => {
  await page.goto("/");
  const cards = page.getByTestId("tool-card");
  await expect(cards).toHaveCount(6);
  for (let i = 0; i < 6; i++) await expect(cards.nth(i).locator("svg").first()).toBeAttached();
});
