import { expect, test } from "@playwright/test";

test("no page shows placeholder text, and the testimonials section is hidden", async ({
  page,
}) => {
  for (const path of [
    "/",
    "/services/new-projects",
    "/services/ready-to-move",
    "/services/resale",
    "/services/commercial",
  ]) {
    await page.goto(path);
    await expect(page.locator("main"), path).not.toContainText(/placeholder/i);
  }
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "What clients say" }),
  ).toHaveCount(0);
});

const SOCIAL = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/nexushorizonadvisors/",
    hover: "rgb(225, 48, 108)",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/nexus-horizon-advisor-28545a44a",
    hover: "rgb(10, 102, 194)",
  },
  {
    name: "Google",
    href: "https://maps.app.goo.gl/26VY3NgoPBhVfAjTA",
    hover: "rgb(66, 133, 244)",
  },
];

test.describe("on a desktop with a mouse", () => {
  // Hover styles only apply on devices that can hover, so this runs as a desktop browser.
  test.use({
    isMobile: false,
    hasTouch: false,
    viewport: { width: 1280, height: 900 },
  });

  test("footer social links open the real profiles and take each brand's colour on hover", async ({
    page,
  }) => {
    await page.goto("/");
    const social = page
      .locator("footer")
      .getByRole("list", { name: "Follow us" });
    for (const s of SOCIAL) {
      const link = social.getByRole("link", { name: new RegExp(s.name) });
      await expect(link).toHaveAttribute("href", s.href);
      await expect(link).toHaveAttribute("target", "_blank");
      await link.scrollIntoViewIfNeeded();
      await link.hover();
      await expect
        .poll(
          () => link.evaluate((el) => getComputedStyle(el).backgroundColor),
          { message: s.name },
        )
        .toBe(s.hover);
    }
  });
});

test("structured data lists the social profiles as sameAs", async ({
  page,
}) => {
  await page.goto("/");
  const ld = (
    await page.locator('script[type="application/ld+json"]').allTextContents()
  ).join(" ");
  for (const s of SOCIAL) expect(ld).toContain(s.href);
});

test("office links point to the exact Google Maps pin", async ({ page }) => {
  await page.goto("/contact");
  await expect(
    page
      .locator('main a[href="https://maps.app.goo.gl/26VY3NgoPBhVfAjTA"]')
      .first(),
  ).toBeVisible();
});

test("privacy policy page exists, is linked from the footer and the consent text", async ({
  page,
}) => {
  const res = await page.goto("/privacy-policy");
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("Privacy policy");
  for (const heading of [
    "What we collect",
    "How we use it",
    "Cookies and analytics",
    "How long we keep it",
    "Your rights",
    "Contact us about your data",
  ]) {
    await expect(
      page.getByRole("heading", { level: 2, name: heading }),
    ).toBeVisible();
  }
  await page.goto("/");
  await expect(
    page.locator("footer").getByRole("link", { name: "Privacy policy" }),
  ).toHaveAttribute("href", "/privacy-policy");
});
