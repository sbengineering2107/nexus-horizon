import { describe, expect, test } from "vitest";
import { getTools, LOAN_JOURNEY } from "@/lib/content/tools";

describe("calculator content (SEO)", () => {
  const tools = getTools();

  test.each(["title", "seoTitle", "seoDescription", "question"] as const)("every %s is unique, so pages don't compete", (key) => {
    const values = tools.map((t) => t[key]);
    expect(new Set(values).size).toBe(values.length);
  });

  test("each SEO title fits Google's display before the brand suffix", () => {
    for (const t of tools) expect(t.seoTitle.length, t.slug).toBeLessThanOrEqual(60);
  });

  test("the home loan calculator keeps its search term and says what makes it different", () => {
    const t = tools.find((x) => x.slug === "home-loan-calculator")!;
    expect(t.title).toBe("Home Loan Calculator & Repayment Planner");
    expect(t.seoTitle).toMatch(/^Home Loan Calculator/);
  });

  test("loan journey runs eligibility → plan → EMI", () => {
    expect(LOAN_JOURNEY).toEqual(["loan-eligibility-calculator", "home-loan-calculator", "emi-calculator"]);
  });

  test("each of the three loan calculators answers the 'which one?' question in its FAQs", () => {
    for (const slug of LOAN_JOURNEY) {
      const t = tools.find((x) => x.slug === slug)!;
      expect(t.faqs.some((f) => /difference between/i.test(f.q)), slug).toBe(true);
    }
  });

  test("tools are grouped for the hub", () => {
    expect(tools.filter((t) => t.group === "loan").map((t) => t.slug)).toEqual([
      "loan-eligibility-calculator",
      "home-loan-calculator",
      "emi-calculator",
      "loan-transfer-calculator",
    ]);
    expect(tools.filter((t) => t.group === "property").map((t) => t.slug)).toEqual(["stamp-duty-calculator", "rental-yield-calculator"]);
  });
});
