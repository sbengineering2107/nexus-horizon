import { expect, test } from "@playwright/test";

test("body text and headings use Google Sans Flex", async ({ page }) => {
  await page.goto("/");
  const families = await page.evaluate(() => ({
    body: getComputedStyle(document.body).fontFamily,
    h1: getComputedStyle(document.querySelector("h1")!).fontFamily,
  }));
  expect(families.body).toMatch(/googleSans/i);
  expect(families.h1).toMatch(/googleSans/i);
});

test("the rupee sign loads its own small font face on calculator pages", async ({ page }) => {
  await page.goto("/calculators/stamp-duty-calculator");
  await page.evaluate(() => document.fonts.ready);
  const loaded = await page.evaluate(() =>
    [...document.fonts].some((f) => /rupeeGlyph/i.test(f.family) && f.status === "loaded"),
  );
  expect(loaded).toBe(true);
});
