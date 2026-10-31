import { expect, test } from "@playwright/test";

const anim = (sel: string) => (page: import("@playwright/test").Page) =>
  page.locator(sel).first().evaluate((el) => getComputedStyle(el).animationName);

const EFFECTS: [string, string][] = [
  ['[data-fx="hero-parallax"]', "hero-parallax"],
  ['[data-fx="skyline"] .bldg', "bldg-rise"],
  ['[data-fx="skyline"] .crane-jib', "crane-swing"],
  ['[data-fx="step-dot"]', "step-dot-0"],
  ['[data-fx="card-parallax"]', "card-parallax"],
  ['[data-fx="curtain"]', "curtain"],
  ['[data-fx="progress-line"]', "progress-line"],
  ['[data-fx="header-shadow"]', "header-shadow"],
];

test.describe("scroll effects", () => {
  for (const [sel, name] of EFFECTS) {
    test(`${name} is attached`, async ({ page }) => {
      await page.goto("/");
      expect(await anim(sel)(page)).toBe(name);
    });
  }
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("turns every scroll effect off", async ({ page }) => {
    await page.goto("/");
    for (const [sel] of EFFECTS) {
      expect(await anim(sel)(page), sel).toBe("none");
    }
  });
});

test("each process step has a dot that fills in order", async ({ page }) => {
  await page.goto("/");
  const names = await page
    .locator('[data-fx="step-dot"]')
    .evaluateAll((els) => els.map((el) => getComputedStyle(el).animationName));
  expect(names).toEqual(["step-dot-0", "step-dot-1", "step-dot-2", "step-dot-3"]);
});

test.describe("hero height on a laptop screen", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test("hero leaves room to see the next section", async ({ page }) => {
    await page.goto("/");
    const h = await page.locator("main > section").first().evaluate((el) => el.getBoundingClientRect().height);
    expect(h).toBeLessThanOrEqual(900 * 0.8);
  });
});
