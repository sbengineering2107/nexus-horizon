import { describe, expect, test } from "vitest";
import { enquiryHref } from "@/lib/enquiry";

describe("enquiryHref", () => {
  test("opens WhatsApp with the chosen service in plain words", () => {
    const href = enquiryHref("resale");
    expect(href).toMatch(/^https:\/\/wa\.me\/91\d{10}\?text=/);
    const text = decodeURIComponent(href.split("?text=")[1]!);
    expect(text).toContain("resale flat");
    expect(text).not.toContain("(from");
  });

  test("falls back to a general consultation request", () => {
    const text = decodeURIComponent(enquiryHref().split("?text=")[1]!);
    expect(text).toContain("free consultation");
  });
});
