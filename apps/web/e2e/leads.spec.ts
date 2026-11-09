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

test("server-side validation shows field errors when the browser checks are bypassed", async ({ page }) => {
  await page.goto("/services/resale");
  const form = page.getByTestId("lead-form-quick");
  await form.evaluate((f: HTMLFormElement) => (f.noValidate = true));
  await form.getByLabel("Your name").fill("A");
  await form.getByLabel("Mobile number").fill("12345");
  await form.getByRole("button", { name: "Request a call back" }).click();
  await expect(form.locator('[data-field-error="name"]')).toBeVisible();
  await expect(form.locator('[data-field-error="phone"]')).toContainText("10-digit");
  await expect(form.locator('[data-field-error="consent"]')).toBeVisible();
  await expect(page).toHaveURL(/\/services\/resale$/);
  // What the visitor typed is kept, and focus moves to the first problem field.
  await expect(form.getByLabel("Your name")).toHaveValue("A");
  await expect(form.getByLabel("Your name")).toBeFocused();
  await expect(form.getByRole("alert")).toContainText("3 highlighted fields");
});

test("the browser checks the mobile number before sending", async ({ page }) => {
  await page.goto("/services/resale");
  const phone = page.getByTestId("lead-form-quick").getByLabel("Mobile number");
  await phone.fill("12-ab");
  expect(await phone.evaluate((el: HTMLInputElement) => el.validity.patternMismatch || el.validity.tooShort)).toBe(true);
  await phone.fill("+91 98765-43210");
  expect(await phone.evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(true);
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
