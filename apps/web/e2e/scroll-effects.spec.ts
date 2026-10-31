import { expect, test } from "@playwright/test";

const anim = (sel: string) => (page: import("@playwright/test").Page) =>
  page.locator(sel).first().evaluate((el) => getComputedStyle(el).animationName);

const EFFECTS: [string, string][] = [
  ['[data-fx="hero-parallax"]', "hero-parallax"],
  ['[data-fx="ridge-draw"] .ridge-scroll-near', "ridge-scroll-draw"],
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
