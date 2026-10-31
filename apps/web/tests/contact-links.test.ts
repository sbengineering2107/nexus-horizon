import { describe, expect, test } from "vitest";
import { telHref, whatsappHref } from "@/lib/contact-links";

describe("telHref", () => {
  test("strips spaces and keeps the +91 prefix", () => {
    expect(telHref("+91 98765 43210")).toBe("tel:+919876543210");
  });
  test("adds +91 to a bare 10-digit number with dashes", () => {
    expect(telHref("98765-43210")).toBe("tel:+919876543210");
  });
  test("accepts a leading 0 trunk prefix", () => {
    expect(telHref("098765 43210")).toBe("tel:+919876543210");
  });
  test("throws on a number that is not 10 digits", () => {
    expect(() => telHref("12345")).toThrow();
  });
});

describe("whatsappHref", () => {
  test("builds a wa.me link with digits only and an encoded message", () => {
    expect(whatsappHref("+91 98765 43210", "Hi from /services/resale")).toBe(
      "https://wa.me/919876543210?text=Hi%20from%20%2Fservices%2Fresale",
    );
  });
  test("omits the text parameter when no message is given", () => {
    expect(whatsappHref("9876543210")).toBe("https://wa.me/919876543210");
  });
  test("throws on an invalid number", () => {
    expect(() => whatsappHref("+1 555 0100")).toThrow();
  });
});
