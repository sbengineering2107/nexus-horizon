import { expect, test } from "@playwright/test";

test("tools hub links to both calculators", async ({ page }) => {
  const res = await page.goto("/tools");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('main a[href="/tools/emi-calculator"]').first()).toBeAttached();
  await expect(page.locator('main a[href="/tools/stamp-duty-calculator"]').first()).toBeAttached();
});

test("EMI calculator updates the monthly EMI as inputs change", async ({ page }) => {
  await page.goto("/tools/emi-calculator");
  await page.getByLabel("Loan amount (₹)").fill("5000000");
  await page.getByLabel("Interest rate (% per year)").fill("8.5");
  await page.getByLabel("Tenure (years)").fill("20");
  await expect(page.getByTestId("emi-value")).toHaveText("₹43,391");
  await expect(page.getByTestId("emi-interest")).toHaveText("₹54,13,879");
  const cta = page.getByRole("link", { name: "Talk to an expert" });
  await expect(cta).toHaveAttribute("href", /wa\.me\/91\d{10}\?text=.*43%2C391/);
});

test("stamp duty calculator uses the higher value and the buyer rate", async ({ page }) => {
  await page.goto("/tools/stamp-duty-calculator");
  await page.getByLabel("Agreement value (₹)").fill("2500000");
  await page.getByLabel("Ready reckoner value (₹, optional)").fill("2800000");
  await expect(page.getByTestId("duty-total")).toHaveText("₹2,24,000");
  await page.getByLabel("Woman, sole owner").check();
  await expect(page.getByTestId("duty-stamp")).toHaveText("₹1,68,000");
  await expect(page.getByText(/Last verified/)).toBeVisible();
});

test("calculator pages carry WebApplication and FAQ structured data", async ({ page }) => {
  for (const path of ["/tools/emi-calculator", "/tools/stamp-duty-calculator"]) {
    await page.goto(path);
    const ld = (await page.locator('script[type="application/ld+json"]').allTextContents()).join(" ");
    expect(ld).toContain('"WebApplication"');
    expect(ld).toContain('"FAQPage"');
  }
});
