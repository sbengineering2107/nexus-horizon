import { describe, expect, test } from "vitest";
import { formatPhone, validateField, validateFields } from "@/lib/leads/validate";

describe("validateField (live, per field)", () => {
  test("uses the same messages as the server", () => {
    expect(validateField("name", "A")).toBe("Please enter your name");
    expect(validateField("phone", "12345")).toBe("Please enter a 10-digit Indian mobile number");
    expect(validateField("email", "x@")).toBe("Please check the email address");
    expect(validateField("consent", undefined)).toBe("Please agree so we can contact you");
  });

  test("returns undefined for valid or empty optional values", () => {
    expect(validateField("name", "Asha")).toBeUndefined();
    expect(validateField("phone", "+91 98765 43210")).toBeUndefined();
    expect(validateField("email", "")).toBeUndefined();
    expect(validateField("consent", "on")).toBeUndefined();
    expect(validateField("budgetRange", "")).toBeUndefined();
  });

  test("required fields reject blanks", () => {
    expect(validateField("name", "   ")).toBe("Please enter your name");
    expect(validateField("phone", "")).toBe("Please enter a 10-digit Indian mobile number");
  });
});

describe("validateFields (on submit)", () => {
  test("checks only the fields the form shows, in order", () => {
    const errors = validateFields({ name: "", phone: "1", email: "bad" }, ["name", "phone", "consent"]);
    expect(Object.keys(errors)).toEqual(["name", "phone", "consent"]);
  });
});

describe("formatPhone", () => {
  test("shows the number we will call", () => {
    expect(formatPhone("09876543210")).toBe("+91 98765 43210");
    expect(formatPhone("123")).toBeNull();
  });
});
