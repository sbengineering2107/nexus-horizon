import { describe, expect, test } from "vitest";
import { leadSchema, normalisePhone } from "@/lib/leads/schema";

const base = {
  name: "Asha Kulkarni",
  phone: "98765 43210",
  formType: "quick",
  sourcePage: "/services/resale",
  consent: "on",
};

describe("normalisePhone", () => {
  test.each([
    ["9876543210", "+919876543210"],
    ["98765 43210", "+919876543210"],
    ["+91 98765-43210", "+919876543210"],
    ["091 9876543210", "+919876543210"],
    ["09876543210", "+919876543210"],
    ["919876543210", "+919876543210"],
  ])("%s → %s", (input, out) => expect(normalisePhone(input)).toBe(out));

  test.each(["12345", "5876543210", "98765432101", "abcdefghij", ""])("rejects %s", (input) =>
    expect(normalisePhone(input)).toBeNull(),
  );
});

describe("leadSchema", () => {
  test("accepts a quick enquiry and normalises the phone", () => {
    const r = leadSchema.safeParse(base);
    expect(r.success).toBe(true);
    expect(r.data?.phone).toBe("+919876543210");
  });

  test("requires consent", () => {
    const r = leadSchema.safeParse({ ...base, consent: undefined });
    expect(r.success).toBe(false);
    expect(r.error?.flatten().fieldErrors.consent?.[0]).toMatch(/agree/i);
  });

  test("rejects short names, bad phones, bad emails, long messages and unknown options", () => {
    const bad = leadSchema.safeParse({
      ...base,
      name: "A",
      phone: "123",
      email: "not-an-email",
      message: "x".repeat(2001),
      budgetRange: "a-lot",
      service: "villas",
    });
    expect(bad.success).toBe(false);
    expect(Object.keys(bad.error!.flatten().fieldErrors).sort()).toEqual(
      ["budgetRange", "email", "message", "name", "phone", "service"].sort(),
    );
  });

  test("turns empty optional fields into undefined", () => {
    const r = leadSchema.parse({ ...base, email: "", area: "", message: "  ", service: "" });
    expect(r.email).toBeUndefined();
    expect(r.area).toBeUndefined();
    expect(r.message).toBeUndefined();
    expect(r.service).toBeUndefined();
  });

  test("only accepts site paths as the source page", () => {
    expect(leadSchema.safeParse({ ...base, sourcePage: "https://evil.com" }).success).toBe(false);
  });
});
