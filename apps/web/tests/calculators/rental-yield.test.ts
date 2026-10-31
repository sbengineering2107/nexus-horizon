import { describe, expect, test } from "vitest";
import { calculateRentalYield } from "@/lib/calculators/rental-yield";

describe("calculateRentalYield", () => {
  test("₹80 L flat, ₹25k rent, ₹3k maintenance, ₹12k tax, 1 vacant month", () => {
    const r = calculateRentalYield({ propertyPrice: 8_000_000, monthlyRent: 25_000, monthlyMaintenance: 3_000, annualPropertyTax: 12_000, vacantMonths: 1 })!;
    expect(r.grossYieldPct).toBe(3.75);
    expect(r.annualNetIncome).toBe(227_000);
    expect(r.netYieldPct).toBe(2.84);
  });

  test.each([
    { propertyPrice: 0, monthlyRent: 20_000, monthlyMaintenance: 0, annualPropertyTax: 0, vacantMonths: 0 },
    { propertyPrice: 5_000_000, monthlyRent: 20_000, monthlyMaintenance: 0, annualPropertyTax: 0, vacantMonths: 13 },
    { propertyPrice: 5_000_000, monthlyRent: -1, monthlyMaintenance: 0, annualPropertyTax: 0, vacantMonths: 0 },
  ])("returns null for invalid input %o", (input) => {
    expect(calculateRentalYield(input)).toBeNull();
  });
});
