import { expect, test } from "@playwright/test";

test("footer shows the real phone number and Bavdhan address", async ({ page }) => {
  await page.goto("/");
  const footer = page.locator("footer");
  await expect(footer).toContainText("+91 87884 32367");
  await expect(footer.locator('a[href="tel:+918788432367"]')).toBeAttached();
  await expect(footer).toContainText("Near M-Connect, Bavdhan");
  await expect(footer).not.toContainText("Placeholder");
});

test("call and WhatsApp buttons use the real number", async ({ page }) => {
  await page.goto("/");
  const bar = page.getByTestId("floating-contact");
  await expect(bar.locator('a[href="tel:+918788432367"]')).toBeAttached();
  await expect(bar.locator('a[href^="https://wa.me/918788432367"]')).toBeAttached();
});

test("structured data carries the real phone and Bavdhan locality, no placeholder email or socials", async ({ page }) => {
  await page.goto("/");
  const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");
  expect(ld).toContain("+91 87884 32367");
  expect(ld).toContain("Near M-Connect, Bavdhan");
  expect(ld).not.toContain("hello@nexushorizon.in");
  expect(ld).not.toContain("linkedin.com/company/nexus-horizon-advisors");
});
