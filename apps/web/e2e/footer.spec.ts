import { expect, test } from "@playwright/test";

test("footer has clear contact actions: call, WhatsApp and office", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("footer").getByRole("list", { name: "Contact" });
  await expect(contact.locator('a[href="tel:+918788432367"]')).toBeVisible();
  await expect(contact.locator('a[href^="https://wa.me/918788432367"]')).toBeVisible();
  await expect(contact).toContainText("Near M-Connect, Bavdhan");
});

test("footer link groups cover services, calculators, areas, guides and company", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  for (const [name, href] of [
    ["Services", "/services/resale"],
    ["Calculators", "/calculators/emi-calculator"],
    ["Pune areas", "/pune/baner"],
    ["Guides", "/blog"],
    ["Company", "/about"],
  ] as const) {
    const nav = footer.getByRole("navigation", { name });
    await expect(nav, name).toBeVisible();
    await expect(nav.locator(`a[href="${href}"]`), name).toBeVisible();
  }
});

test("footer links are comfortable tap targets and don't wrap mid-label on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const links = page.locator("footer nav a");
  const n = await links.count();
  expect(n).toBeGreaterThanOrEqual(25);
  for (let i = 0; i < n; i++) {
    const box = (await links.nth(i).boundingBox())!;
    expect(box.height, await links.nth(i).innerText()).toBeGreaterThanOrEqual(28);
    expect(box.height, await links.nth(i).innerText()).toBeLessThan(48);
  }
});

test("footer fits a phone without sideways scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
