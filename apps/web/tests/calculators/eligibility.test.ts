import { describe, expect, test } from "vitest";
import { calculateEligibility } from "@/lib/calculators/eligibility";

describe("calculateEligibility", () => {
  test("₹1.5 L income, ₹10k existing EMIs, 50% of income, 8.5% for 20 years", () => {
    const r = calculateEligibility({ monthlyIncome: 150_000, existingEmis: 10_000, foirPct: 50, annualRatePct: 8.5, years: 20 })!;
    expect(r.affordableEmi).toBe(65_000);
    expect(r.maxLoan).toBe(7_490_005);
  });

  test("returns zero when existing EMIs already use the allowed share of income", () => {
    const r = calculateEligibility({ monthlyIncome: 50_000, existingEmis: 30_000, foirPct: 50, annualRatePct: 8.5, years: 20 })!;
    expect(r.affordableEmi).toBe(0);
    expect(r.maxLoan).toBe(0);
  });

  test.each([
    { monthlyIncome: 0, existingEmis: 0, foirPct: 50, annualRatePct: 8.5, years: 20 },
    { monthlyIncome: 100_000, existingEmis: -1, foirPct: 50, annualRatePct: 8.5, years: 20 },
    { monthlyIncome: 100_000, existingEmis: 0, foirPct: 0, annualRatePct: 8.5, years: 20 },
    { monthlyIncome: 100_000, existingEmis: 0, foirPct: 50, annualRatePct: 8.5, years: 0 },
  ])("returns null for invalid input %o", (input) => {
    expect(calculateEligibility(input)).toBeNull();
  });
});
