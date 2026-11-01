import { expect, test } from "@playwright/test";

const SLUGS = [
  "emi-calculator",
  "home-loan-calculator",
  "loan-eligibility-calculator",
  "loan-transfer-calculator",
  "stamp-duty-calculator",
  "rental-yield-calculator",
];

test("footer and hero show the MahaRERA number A031262605250", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("maharera")).toContainText("A031262605250");
  await expect(page.locator("main > section").first()).toContainText("A031262605250");
});

test.describe("desktop menu", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("uses the home-buyer labels and links", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" }).first();
    await expect(nav.getByRole("link", { name: "Our Services" })).toHaveAttribute("href", "/services");
    await expect(nav.getByRole("link", { name: "Home Loan Calculators" })).toHaveAttribute("href", "/calculators");
    await expect(nav.getByRole("link", { name: "Areas We Serve" })).toHaveAttribute("href", "/#areas");
  });
});

test("calculators live under /calculators", async ({ page }) => {
  const res = await page.goto("/calculators");
  expect(res?.status()).toBe(200);
  for (const slug of SLUGS) {
    await expect(page.locator(`main a[href="/calculators/${slug}"]`).first()).toBeAttached();
  }
});

test("old /tools addresses redirect permanently", async ({ request }) => {
  const cases: [string, string][] = [
    ["/tools", "/calculators"],
    ["/tools/emi-calculator", "/calculators/emi-calculator"],
  ];
  for (const [from, to] of cases) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toBe(to);
  }
});

test("each step shows the illustration that matches its label", async ({ page }) => {
  await page.goto("/");
  const kinds = await page
    .getByTestId("step-card")
    .evaluateAll((els) => els.map((el) => el.querySelector("[data-illustration]")?.getAttribute("data-illustration")));
  expect(kinds).toEqual(["brief", "shortlist", "visit", "close"]);
});
