import { expect, test } from "vitest";
import { formatInr, formatInrShort } from "@/lib/format";

test("formats rupees with Indian digit grouping", () => {
  expect(formatInr(1234567)).toBe("₹12,34,567");
});

test("short form uses lakh and crore", () => {
  expect(formatInrShort(4_500_000)).toBe("₹45 L");
  expect(formatInrShort(12_500_000)).toBe("₹1.25 Cr");
});
