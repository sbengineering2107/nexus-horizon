import { describe, expect, test } from "vitest";
import { planHomeLoan } from "@/lib/calculators/loan-planner";

describe("planHomeLoan", () => {
  const r = planHomeLoan({ propertyPrice: 10_000_000, downPaymentPct: 20, annualRatePct: 8.5, years: 20 })!;

  test("derives the loan amount from price and down payment", () => {
    expect(r.downPayment).toBe(2_000_000);
    expect(r.loanAmount).toBe(8_000_000);
    expect(r.emi).toBe(69_426);
  });

  test("builds a yearly schedule that pays the loan down to zero", () => {
    expect(r.schedule).toHaveLength(20);
    expect(r.schedule[0]).toEqual({ year: 1, interest: 673_892, principal: 159_218, balance: 7_840_782 });
    expect(r.schedule.at(-1)!.balance).toBe(0);
  });

  test("yearly principal adds up to the loan amount", () => {
    const sum = r.schedule.reduce((s, y) => s + y.principal, 0);
    expect(Math.abs(sum - 8_000_000)).toBeLessThanOrEqual(20);
  });

  test.each([
    { propertyPrice: 0, downPaymentPct: 20, annualRatePct: 8.5, years: 20 },
    { propertyPrice: 1_000_000, downPaymentPct: 100, annualRatePct: 8.5, years: 20 },
    { propertyPrice: 1_000_000, downPaymentPct: -5, annualRatePct: 8.5, years: 20 },
  ])("returns null for invalid input %o", (input) => {
    expect(planHomeLoan(input)).toBeNull();
  });
});
