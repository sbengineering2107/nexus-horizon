import { expect, test } from "@playwright/test";

test("tools hub lists all six calculators", async ({ page }) => {
  await page.goto("/calculators");
  for (const slug of ["emi-calculator", "home-loan-calculator", "loan-eligibility-calculator", "loan-transfer-calculator", "rental-yield-calculator", "stamp-duty-calculator"]) {
    await expect(page.locator(`main a[href="/calculators/${slug}"]`).first()).toBeAttached();
  }
});

test("home loan calculator shows loan, EMI and a yearly schedule", async ({ page }) => {
  await page.goto("/calculators/home-loan-calculator");
  await page.getByLabel("Property price (₹)").fill("10000000");
  await page.getByLabel("Down payment (%)").fill("20");
  await page.getByLabel("Interest rate (% per year)").fill("8.5");
  await page.getByLabel("Tenure (years)").fill("20");
  await expect(page.getByTestId("plan-loan")).toHaveText("₹80,00,000");
  await expect(page.getByTestId("plan-emi")).toHaveText("₹69,426");
  await expect(page.getByTestId("schedule-row")).toHaveCount(20);
});

test("eligibility calculator shows the maximum loan", async ({ page }) => {
  await page.goto("/calculators/loan-eligibility-calculator");
  await page.getByLabel("Net monthly income (₹)").fill("150000");
  await page.getByLabel("Existing EMIs (₹ per month)").fill("10000");
  await page.getByLabel("Interest rate (% per year)").fill("8.5");
  await page.getByLabel("Tenure (years)").fill("20");
  await page.getByLabel("Share of income for EMIs (%)").fill("50");
  await expect(page.getByTestId("elig-max")).toHaveText("₹74,90,005");
});

test("loan transfer calculator gives savings and a verdict", async ({ page }) => {
  await page.goto("/calculators/loan-transfer-calculator");
  await page.getByLabel("Outstanding loan (₹)").fill("4000000");
  await page.getByLabel("Current rate (%)").fill("9.5");
  await page.getByLabel("New rate offered (%)").fill("8.5");
  await page.getByLabel("Years remaining").fill("15");
  await page.getByLabel("Transfer charges (₹)").fill("25000");
  await expect(page.getByTestId("transfer-net")).toHaveText("₹4,03,293");
  await expect(page.getByTestId("transfer-verdict")).toContainText("worth");
});

test("rental yield calculator gives gross and net yield", async ({ page }) => {
  await page.goto("/calculators/rental-yield-calculator");
  await page.getByLabel("Property price (₹)").fill("8000000");
  await page.getByLabel("Monthly rent (₹)").fill("25000");
  await page.getByLabel("Monthly maintenance (₹)").fill("3000");
  await page.getByLabel("Property tax (₹ per year)").fill("12000");
  await page.getByLabel("Vacant months per year").fill("1");
  await expect(page.getByTestId("yield-gross")).toHaveText("3.75%");
  await expect(page.getByTestId("yield-net")).toHaveText("2.84%");
});
