import { describe, expect, test } from "vitest";
import { analyticsConfig, aiSource, classifyLink, verificationMeta } from "@/lib/analytics/config";

describe("analyticsConfig", () => {
  test("is off outside Vercel production even with IDs", () => {
    const c = analyticsConfig({ VERCEL_ENV: "preview", NEXT_PUBLIC_GA_ID: "G-ABC123", NEXT_PUBLIC_CLARITY_ID: "abc" });
    expect(c).toEqual({ gaId: null, clarityId: null, speedInsights: false });
  });

  test("loads Speed Insights only when actually running on Vercel", () => {
    expect(analyticsConfig({ VERCEL_ENV: "production" }).speedInsights).toBe(false);
    expect(analyticsConfig({ VERCEL_ENV: "production", VERCEL: "1" }).speedInsights).toBe(true);
  });

  test("turns on each tool whose ID is set in production", () => {
    expect(analyticsConfig({ VERCEL: "1", VERCEL_ENV: "production", NEXT_PUBLIC_GA_ID: "G-ABC123" })).toEqual({
      gaId: "G-ABC123",
      clarityId: null,
      speedInsights: true,
    });
  });

  test("ignores malformed IDs instead of injecting them into a script", () => {
    const c = analyticsConfig({ VERCEL_ENV: "production", NEXT_PUBLIC_GA_ID: "G-1');alert(1)//", NEXT_PUBLIC_CLARITY_ID: "x y" });
    expect(c.gaId).toBeNull();
    expect(c.clarityId).toBeNull();
  });
});

describe("classifyLink", () => {
  test("names WhatsApp, call and email links", () => {
    expect(classifyLink("https://wa.me/918788432367?text=hi")).toBe("whatsapp_click");
    expect(classifyLink("tel:+918788432367")).toBe("call_click");
    expect(classifyLink("mailto:a@b.in")).toBe("email_click");
    expect(classifyLink("/services")).toBeNull();
  });
});

describe("aiSource", () => {
  test("recognises AI assistants by referrer host", () => {
    expect(aiSource("https://chatgpt.com/")).toBe("chatgpt");
    expect(aiSource("https://www.perplexity.ai/search?q=x")).toBe("perplexity");
    expect(aiSource("https://claude.ai/chat/1")).toBe("claude");
    expect(aiSource("https://gemini.google.com/app")).toBe("gemini");
    expect(aiSource("https://copilot.microsoft.com/")).toBe("copilot");
    expect(aiSource("https://www.google.com/")).toBeNull();
    expect(aiSource("")).toBeNull();
  });
});

describe("verificationMeta", () => {
  test("adds Google and Bing verification only when set", () => {
    expect(verificationMeta({})).toBeUndefined();
    expect(verificationMeta({ GOOGLE_SITE_VERIFICATION: "g123", BING_SITE_VERIFICATION: "b456" })).toEqual({
      google: "g123",
      other: { "msvalidate.01": "b456" },
    });
  });
});
