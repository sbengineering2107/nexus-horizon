import { describe, expect, test } from "vitest";
import { captureAttribution, parseAttribution } from "@/lib/leads/attribution";

describe("captureAttribution", () => {
  test("records UTM tags, gclid, referrer and landing page", () => {
    const a = captureAttribution(
      "https://www.nexushorizonadvisors.com/pune/baner?utm_source=google&utm_medium=cpc&utm_campaign=baner&gclid=abc123&x=1",
      "https://www.google.com/",
    );
    expect(a).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "baner",
      gclid: "abc123",
      referrer: "https://www.google.com",
      landing_page: "/pune/baner",
    });
  });

  test("ignores the site's own pages as referrer", () => {
    const a = captureAttribution("https://www.nexushorizonadvisors.com/blog", "https://www.nexushorizonadvisors.com/");
    expect(a).toEqual({ landing_page: "/blog" });
  });
});

describe("parseAttribution", () => {
  test("round-trips a stored cookie and drops unknown keys and oversize values", () => {
    const cookie = encodeURIComponent(
      JSON.stringify({ utm_source: "fb", evil: "x", referrer: "y".repeat(600), landing_page: "/x" }),
    );
    expect(parseAttribution(cookie)).toEqual({ utm_source: "fb", referrer: "y".repeat(200), landing_page: "/x" });
  });

  test("returns an empty object for missing or garbage cookies", () => {
    expect(parseAttribution(undefined)).toEqual({});
    expect(parseAttribution("%%%not-json")).toEqual({});
    expect(parseAttribution(encodeURIComponent("[1,2]"))).toEqual({});
  });
});

test("stores only the referring site's origin, not its path or query", () => {
  const a = captureAttribution("https://www.nexushorizonadvisors.com/", "https://www.google.com/search?q=asha+kulkarni+phone");
  expect(a.referrer).toBe("https://www.google.com");
});
