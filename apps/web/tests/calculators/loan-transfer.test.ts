import { describe, expect, test } from "vitest";
import { compareLoanTransfer } from "@/lib/calculators/loan-transfer";

describe("compareLoanTransfer", () => {
  test("₹40 L outstanding, 9.5% → 8.5%, 15 years left, ₹25k charges", () => {
    const r = compareLoanTransfer({ outstanding: 4_000_000, currentRatePct: 9.5, newRatePct: 8.5, yearsLeft: 15, transferCharges: 25_000 })!;
    expect(r.currentEmi).toBe(41_769);
    expect(r.newEmi).toBe(39_390);
    expect(r.interestSaved).toBe(428_293);
    expect(r.netSaving).toBe(403_293);
    expect(r.worthIt).toBe(true);
  });

  test("is not worth it when charges exceed the interest saved", () => {
    const r = compareLoanTransfer({ outstanding: 500_000, currentRatePct: 9, newRatePct: 8.9, yearsLeft: 2, transferCharges: 25_000 })!;
    expect(r.netSaving).toBeLessThan(0);
    expect(r.worthIt).toBe(false);
  });

  test.each([
    { outstanding: 0, currentRatePct: 9, newRatePct: 8, yearsLeft: 10, transferCharges: 0 },
    { outstanding: 1_000_000, currentRatePct: 9, newRatePct: 8, yearsLeft: 0, transferCharges: 0 },
    { outstanding: 1_000_000, currentRatePct: 9, newRatePct: 8, yearsLeft: 10, transferCharges: -1 },
  ])("returns null for invalid input %o", (input) => {
    expect(compareLoanTransfer(input)).toBeNull();
  });
});
