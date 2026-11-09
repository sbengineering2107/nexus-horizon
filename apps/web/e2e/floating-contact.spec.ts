import { expect, test } from "@playwright/test";

const text = (href: string | null) => decodeURIComponent((href ?? "").split("?text=")[1] ?? "");

test.describe("floating contact buttons", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("show round Call and WhatsApp buttons on mobile", async ({ page }) => {
    await page.goto("/");
    const call = page.getByRole("link", { name: "Call Nexus Horizon" });
    const wa = page.getByRole("link", { name: "Chat on WhatsApp" });
    await expect(call).toBeVisible();
    await expect(wa).toBeVisible();
    await expect(call).toHaveAttribute("href", "tel:+918788432367");
    expect(await wa.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/918788432367\?text=/);
    const box = (await wa.boundingBox())!;
    expect(Math.abs(box.width - box.height)).toBeLessThan(1);
    expect(box.x + box.width).toBeGreaterThan(390 - 40);
    await expect(page.getByTestId("mobile-cta-bar")).toHaveCount(0);
  });

  test("WhatsApp message follows the page the visitor is on", async ({ page }) => {
    await page.goto("/pune/baner");
    const wa = page.getByRole("link", { name: "Chat on WhatsApp" });
    expect(text(await wa.getAttribute("href"))).toContain("Baner guide");
    await page.goto("/calculators/emi-calculator");
    expect(text(await wa.getAttribute("href"))).toContain("EMI Calculator");
  });

  test("header consultation button follows the page too", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/services/resale");
    const book = page.locator("header").getByRole("link", { name: "Book a consultation" });
    const href = await book.getAttribute("href");
    // With lead forms on, it opens the contact page; otherwise WhatsApp with the page's message.
    if (href !== "/contact") expect(text(href)).toContain("resale flat");
    await expect(page.getByRole("link", { name: "Chat on WhatsApp" })).toBeHidden();
  });

  test("the hero picker sends a plain-English message", async ({ page }) => {
    test.skip(Boolean(process.env.DATABASE_URL), "with lead forms on, the picker opens the contact form instead");
    await page.goto("/");
    await page.getByRole("button", { name: "New Project Advisory" }).click();
    const t = text(await page.getByTestId("hero-enquiry").getAttribute("href"));
    expect(t).toContain("new or under-construction projects");
    expect(t).not.toContain("(from");
  });
});

test("header consultation link keeps its button styling", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator("header").getByRole("link", { name: "Book a consultation" })).toBeHidden();
  await page.setViewportSize({ width: 1280, height: 800 });
  const book = page.locator("header").getByRole("link", { name: "Book a consultation" });
  await expect(book).toBeVisible();
  expect(await book.evaluate((el) => getComputedStyle(el).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
});
