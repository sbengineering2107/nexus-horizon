import { describe, expect, test } from "vitest";
import { calculateStampDuty, PUNE_RATES } from "@/lib/calculators/stamp-duty";

describe("calculateStampDuty (Pune municipal areas)", () => {
  test("man or joint buyer pays 7% on the agreement value when it is higher, plus capped registration", () => {
    const r = calculateStampDuty({ agreementValue: 8_000_000, readyReckonerValue: 7_000_000, buyer: "man-or-joint" })!;
    expect(r.dutiableValue).toBe(8_000_000);
    expect(r.stampDuty).toBe(560_000);
    expect(r.registrationFee).toBe(30_000);
    expect(r.total).toBe(590_000);
  });

  test("a woman buying in her sole name pays 6%", () => {
    const r = calculateStampDuty({ agreementValue: 8_000_000, buyer: "woman-sole" })!;
    expect(r.stampDuty).toBe(480_000);
    expect(r.total).toBe(510_000);
  });

  test("duty and registration use the ready reckoner value when it is higher", () => {
    const r = calculateStampDuty({ agreementValue: 2_500_000, readyReckonerValue: 2_800_000, buyer: "man-or-joint" })!;
    expect(r.dutiableValue).toBe(2_800_000);
    expect(r.stampDuty).toBe(196_000);
    expect(r.registrationFee).toBe(28_000);
  });

  test("breaks the duty into base, metro cess and local body tax", () => {
    const r = calculateStampDuty({ agreementValue: 8_000_000, buyer: "man-or-joint" })!;
    expect(r.breakdown).toEqual([
      { label: "Base stamp duty", ratePct: 5, amount: 400_000 },
      { label: "Metro cess", ratePct: 1, amount: 80_000 },
      { label: "Local body tax", ratePct: 1, amount: 80_000 },
    ]);
  });

  test("rate config records its source and verification date", () => {
    expect(PUNE_RATES.sources.length).toBeGreaterThan(0);
    expect(PUNE_RATES.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test.each([0, -1, Number.NaN])("returns null for agreement value %s", (v) => {
    expect(calculateStampDuty({ agreementValue: v, buyer: "man-or-joint" })).toBeNull();
  });
});
