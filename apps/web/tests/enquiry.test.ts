import { describe, expect, test } from "vitest";
import { AREAS, enquiryHref } from "@/lib/enquiry";

describe("enquiryHref", () => {
  test("names the chosen service and source page in the WhatsApp message", () => {
    const href = enquiryHref({ service: "Resale", pagePath: "/" });
    expect(href).toMatch(/^https:\/\/wa\.me\/91\d{10}\?text=/);
    const text = decodeURIComponent(href.split("?text=")[1]!);
    expect(text).toContain("Resale");
    expect(text).toContain("(from /)");
  });

  test("names the chosen area", () => {
    const text = decodeURIComponent(enquiryHref({ area: "Baner", pagePath: "/" }).split("?text=")[1]!);
    expect(text).toContain("Baner");
  });

  test("falls back to a general consultation request", () => {
    const text = decodeURIComponent(enquiryHref({ pagePath: "/services" }).split("?text=")[1]!);
    expect(text).toContain("free consultation");
  });
});

describe("AREAS", () => {
  test("lists the four launch micro-markets in Pune", () => {
    expect(AREAS.map((a) => a.name)).toEqual(["Baner", "Hinjewadi", "Kharadi", "Wakad"]);
  });
});
