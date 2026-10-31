import { describe, expect, test } from "vitest";
import { calculateEmi } from "@/lib/calculators/emi";

describe("calculateEmi", () => {
  test("₹50 lakh at 8.5% for 20 years", () => {
    const r = calculateEmi({ principal: 5_000_000, annualRatePct: 8.5, years: 20 })!;
    expect(r.emi).toBe(43_391);
    expect(r.totalPayable).toBe(10_413_879);
    expect(r.totalInterest).toBe(5_413_879);
  });

  test("₹30 lakh at 9% for 15 years", () => {
    expect(calculateEmi({ principal: 3_000_000, annualRatePct: 9, years: 15 })!.emi).toBe(30_428);
  });

  test("a 0% loan is principal split evenly across months", () => {
    const r = calculateEmi({ principal: 1_200_000, annualRatePct: 0, years: 10 })!;
    expect(r.emi).toBe(10_000);
    expect(r.totalInterest).toBe(0);
  });

  test.each([
    { principal: 0, annualRatePct: 8, years: 20 },
    { principal: -5, annualRatePct: 8, years: 20 },
    { principal: 1_000_000, annualRatePct: -1, years: 20 },
    { principal: 1_000_000, annualRatePct: 8, years: 0 },
    { principal: Number.NaN, annualRatePct: 8, years: 20 },
  ])("returns null for invalid input %o", (input) => {
    expect(calculateEmi(input)).toBeNull();
  });
});
