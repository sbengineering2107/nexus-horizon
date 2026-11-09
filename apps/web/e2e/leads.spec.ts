import { expect, test, type Page } from "@playwright/test";

// These run against a build with DATABASE_URL set (PGlite locally and in CI).
test.skip(!process.env.DATABASE_URL, "lead forms are only built when DATABASE_URL is set");
const unique = () => `Test ${Date.now().toString(36)}`;

async function fillQuick(page: Page, scope = page.locator("main")) {
  await scope.getByLabel("Your name").fill(unique());
  await scope.getByLabel("Mobile number").fill("98765 43210");
  await scope.getByRole("checkbox").check();
}

test("service page quick form submits and lands on the thank-you page", async ({ page }) => {
  await page.goto("/services/resale");
  const form = page.getByTestId("lead-form-quick");
  await expect(form.locator('input[name="service"]')).toHaveValue("resale");
  await fillQuick(page, form);
  await form.getByRole("button", { name: "Request a call back" }).click();
  await expect(page).toHaveURL(/\/thank-you\?form=quick$/);
  await expect(page.locator("h1")).toContainText("We've got your enquiry");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("contact page consultation form sends the optional details too", async ({ page }) => {
  await page.goto("/contact");
  const form = page.getByTestId("lead-form-consultation");
  await fillQuick(page, form);
  await form.getByRole("textbox", { name: "Email (optional)" }).fill("asha@example.com");
  await form.getByLabel("What are you looking for?").selectOption("new-projects");
  await form.getByLabel("Preferred area").selectOption("Baner");
  await form.getByLabel("Budget").selectOption("50l-1cr");
  await form.getByLabel("When do you plan to buy?").selectOption("3-months");
  await form.getByLabel("Anything else we should know?").fill("2 BHK near the metro, please.");
  await form.getByRole("button", { name: "Send my requirements" }).click();
  await expect(page).toHaveURL(/\/thank-you\?form=consultation$/);
});

test("calculator form carries the current result as its message", async ({ page }) => {
  await page.goto("/calculators/emi-calculator");
  const form = page.getByTestId("lead-form-calculator");
  await expect(form.locator('input[name="message"]')).toHaveValue(/EMI calculator: loan/);
  await fillQuick(page, form);
  await form.getByRole("button", { name: "Ask an advisor to check this" }).click();
  await expect(page).toHaveURL(/\/thank-you\?form=calculator$/);
});

test("fields are checked as you go: error on leaving the field, cleared live once fixed", async ({ page }) => {
  await page.goto("/services/resale");
  const form = page.getByTestId("lead-form-quick");
  const phone = form.getByLabel("Mobile number");
  await phone.fill("12345");
  await form.getByLabel("Your name").focus(); // leave the phone field
  await expect(form.locator('[data-field-error="phone"]')).toContainText("10-digit Indian mobile number");
  await expect(phone).toHaveAttribute("aria-invalid", "true");
  // Fixing it clears the error while typing, without submitting, and confirms the number.
  await phone.fill("98765 43210");
  await expect(form.locator('[data-field-error="phone"]')).toHaveCount(0);
  await expect(form.locator('[data-field-hint="phone"]')).toHaveText("We'll call +91 98765 43210");
  await expect(page).toHaveURL(/\/services\/resale$/);
});

test("one style of messages: no browser pop-ups, all errors inline on submit", async ({ page }) => {
  await page.goto("/services/resale");
  const form = page.getByTestId("lead-form-quick");
  await expect(form).toHaveAttribute("novalidate", "");
  await form.getByLabel("Your name").fill("A");
  await form.getByRole("button", { name: "Request a call back" }).click();
  await expect(form.locator('[data-field-error="name"]')).toHaveText("Please enter your name");
  await expect(form.locator('[data-field-error="phone"]')).toBeVisible();
  await expect(form.locator('[data-field-error="consent"]')).toHaveText("Please agree so we can contact you");
  await expect(form.getByRole("alert")).toContainText("3 highlighted fields");
  // Nothing was sent, what was typed is kept, and focus is on the first problem.
  await expect(page).toHaveURL(/\/services\/resale$/);
  await expect(form.getByLabel("Your name")).toHaveValue("A");
  await expect(form.getByLabel("Your name")).toBeFocused();
  // Ticking consent clears its error immediately.
  await form.getByRole("checkbox").check();
  await expect(form.locator('[data-field-error="consent"]')).toHaveCount(0);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  // Static pages can't echo server messages back without JavaScript, but the server still
  // refuses invalid data (field-by-field messages are covered by the unit tests).
  test("the server still refuses invalid data", async ({ page }) => {
    await page.goto("/services/resale");
    const form = page.getByTestId("lead-form-quick");
    await form.getByLabel("Your name").fill("A");
    await form.getByLabel("Mobile number").fill("12345");
    await form.getByRole("button", { name: "Request a call back" }).click();
    await page.waitForLoadState("load");
    await expect(page).not.toHaveURL(/thank-you/);
  });
});

test("a filled honeypot is accepted silently", async ({ page }) => {
  await page.goto("/services/new-projects");
  const form = page.getByTestId("lead-form-quick");
  await fillQuick(page, form);
  await form.locator('input[name="nh_hp_extra"]').evaluate((el: HTMLInputElement) => (el.value = "http://spam.example"));
  await form.getByRole("button", { name: "Request a call back" }).click();
  await expect(page).toHaveURL(/\/thank-you/);
});

test("first visit stores attribution in a first-party cookie", async ({ page, context }) => {
  await page.goto("/pune/baner?utm_source=google&utm_medium=cpc&gclid=xyz");
  await expect
    .poll(async () => (await context.cookies()).find((c) => c.name === "nh_attr")?.value ?? "")
    .toContain("google");
  const cookie = (await context.cookies()).find((c) => c.name === "nh_attr")!;
  const data = JSON.parse(decodeURIComponent(cookie.value));
  expect(data).toMatchObject({ utm_source: "google", utm_medium: "cpc", gclid: "xyz", landing_page: "/pune/baner" });
  expect(cookie.sameSite).toBe("Lax");
});

test("area guides stay information-only (no lead form)", async ({ page }) => {
  await page.goto("/pune/baner");
  await expect(page.locator("form[data-testid^='lead-form']")).toHaveCount(0);
});

test("header Book a consultation opens the contact page", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await expect(page.locator("header").getByRole("link", { name: "Book a consultation" })).toHaveAttribute("href", "/contact");
});

test.describe("consultation buttons lead to the forms", () => {
  test("blog article sidebar has a call-back form instead of a WhatsApp button", async ({ page }) => {
    await page.goto("/blog/total-cost-of-buying-a-flat-in-pune");
    const box = page.locator("#call-back");
    await expect(box.getByTestId("lead-form-quick")).toBeVisible();
    await expect(box.locator('input[name="sourcePage"]')).toHaveValue("/blog/total-cost-of-buying-a-flat-in-pune");
    await expect(box.getByLabel("What are you looking for?")).toBeVisible();
  });

  test("home picker opens the contact form with the chosen service selected", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Resale & Secondary Market" }).click();
    const cta = page.getByTestId("hero-enquiry");
    await expect(cta).toHaveAttribute("href", "/contact?service=resale");
    await cta.click();
    await expect(page).toHaveURL(/\/contact\?service=resale$/);
    await expect(page.getByTestId("lead-form-consultation").getByLabel("What are you looking for?")).toHaveValue("resale");
  });

  test("calculator 'Talk to an expert' takes you to the form under the result", async ({ page }) => {
    for (const path of ["/calculators/emi-calculator", "/calculators/stamp-duty-calculator", "/calculators/rental-yield-calculator"]) {
      await page.goto(path);
      const cta = page.getByRole("link", { name: "Talk to an expert" });
      await expect(cta, path).toHaveAttribute("href", "#calc-lead");
      await cta.click();
      await expect(page.getByTestId("lead-form-calculator").getByLabel("Your name"), path).toBeFocused();
    }
  });

  test("no page's consultation button opens WhatsApp", async ({ page }) => {
    for (const path of ["/", "/services/resale", "/blog", "/blog/baner-vs-wakad", "/about", "/how-we-work", "/faq", "/calculators/emi-calculator", "/pune"]) {
      await page.goto(path);
      const hrefs = await page
        .locator("main a")
        .filter({ hasText: /consultation|talk to an expert|get advice/i })
        .evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
      for (const h of hrefs) expect(h, `${path}: ${h}`).not.toMatch(/wa\.me/);
    }
  });
});
