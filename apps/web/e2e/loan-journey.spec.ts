import { expect, test } from "@playwright/test";

const JOURNEY = ["loan-eligibility-calculator", "home-loan-calculator", "emi-calculator"];

for (const current of JOURNEY) {
  test(`${current} links to the other two loan calculators in journey order`, async ({ page }) => {
    await page.goto(`/calculators/${current}`);
    const guide = page.getByRole("region", { name: "Which loan calculator do I need?" });
    const items = guide.getByRole("listitem");
    await expect(items).toHaveCount(3);
    for (const [i, slug] of JOURNEY.entries()) {
      const item = items.nth(i);
      if (slug === current) {
        await expect(item.locator('[aria-current="page"]')).toBeAttached();
      } else {
        await expect(item.locator(`a[href="/calculators/${slug}"]`)).toBeAttached();
      }
    }
  });
}

test("hub groups calculators under two headings", async ({ page }) => {
  await page.goto("/calculators");
  await expect(page.getByRole("heading", { level: 2, name: "Home loan calculators", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Property costs and rental returns", exact: true })).toBeVisible();
});

test("home loan calculator page uses the planner name", async ({ page }) => {
  await page.goto("/calculators/home-loan-calculator");
  await expect(page.locator("h1")).toHaveText("Home Loan Calculator & Repayment Planner");
});
