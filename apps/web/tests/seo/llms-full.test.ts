import { describe, expect, test } from "vitest";
import { llmsFull } from "@/lib/seo/llms-full";
import { getPosts } from "@/lib/content/blog";

describe("llms-full.txt", () => {
  const text = llmsFull();

  test("includes every guide's body, services, areas and calculators", () => {
    for (const p of getPosts()) expect(text, p.slug).toContain(`### ${p.title}`);
    expect(text).toContain("### Resale & Secondary Market");
    expect(text).toContain("#### Baner");
    expect(text).toContain("### Home Loan EMI Calculator");
    expect(text).toContain("A031262605250");
    expect(text.length).toBeGreaterThan(60_000);
  });

  test("uses absolute links and drops placeholder notes", () => {
    expect(text).not.toMatch(/\]\(\/[a-z]/);
    expect(text.toLowerCase()).not.toContain("placeholder");
  });

  test("keeps exactly one top-level heading", () => {
    expect(text.match(/^# /gm)).toHaveLength(1);
  });
});
