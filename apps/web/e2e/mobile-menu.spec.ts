import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("header fits a phone screen without sideways scrolling", async ({ page }) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("phone menu opens to all four sections and closes after navigating", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const menu = page.getByRole("navigation", { name: "Mobile" });
  for (const name of ["Our Services", "Home Loan Calculators", "Areas We Serve", "Property Guides"]) {
    await expect(menu.getByRole("link", { name })).toBeVisible();
  }
  await menu.getByRole("link", { name: "Property Guides" }).click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(menu).toBeHidden();
});
