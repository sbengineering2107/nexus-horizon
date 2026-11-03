import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { CATEGORIES, getPost, getPosts, getPostsByCategory, morePosts, postsRelatedTo } from "@/lib/content/blog";
import { getAreas } from "@/lib/content/areas";
import { getServices } from "@/lib/content/services";
import { getTools } from "@/lib/content/tools";

const dir = join(process.cwd(), "content/blog");
const raw = (slug: string) => readFileSync(join(dir, `${slug}.mdx`), "utf8");

describe("blog content", () => {
  test("has at least two published guides in every category", () => {
    expect(getPosts().length).toBeGreaterThanOrEqual(8);
    for (const c of CATEGORIES) expect(getPostsByCategory(c.id).length, c.id).toBeGreaterThanOrEqual(2);
  });

  test("slug matches the file name", () => {
    const files = readdirSync(dir).filter((f) => f.endsWith(".mdx"));
    expect(files.map((f) => f.replace(/\.mdx$/, "")).sort()).toEqual(getPosts().map((p) => p.slug).sort());
  });

  test("related areas exist", () => {
    const areas = new Set(getAreas().map((a) => a.slug));
    for (const p of getPosts()) for (const a of p.related.areas) expect(areas.has(a), `${p.slug} → ${a}`).toBe(true);
  });

  test("every internal link in an article points to a real page", () => {
    const pages = new Set([
      "/",
      "/services",
      "/pune",
      "/calculators",
      "/blog",
      ...getServices().map((s) => `/services/${s.slug}`),
      ...getAreas().map((a) => `/pune/${a.slug}`),
      ...getTools().map((t) => `/calculators/${t.slug}`),
      ...getPosts().map((p) => `/blog/${p.slug}`),
    ]);
    for (const p of getPosts()) {
      for (const [, href] of raw(p.slug).matchAll(/\]\((\/[^)\s#]*)/g)) {
        expect(pages.has(href!), `${p.slug} links to ${href}`).toBe(true);
      }
    }
  });

  test("articles are substantial, sourced and free of placeholders and H1s", () => {
    for (const p of getPosts()) {
      expect(p.metadata.wordCount, p.slug).toBeGreaterThan(700);
      expect(p.sources.length, p.slug).toBeGreaterThanOrEqual(2);
      const body = raw(p.slug).split(/^---$/m).slice(2).join("---");
      expect(body, p.slug).not.toMatch(/^# /m);
      expect(body.toLowerCase(), p.slug).not.toContain("placeholder");
      expect(body, p.slug).not.toMatch(/\[(TODO|TBD)/i);
    }
  });

  test("lookups", () => {
    const first = getPosts()[0]!;
    expect(getPost(first.slug)?.title).toBe(first.title);
    expect(getPost("nope")).toBeNull();
    expect(morePosts(first).map((p) => p.slug)).not.toContain(first.slug);
    expect(postsRelatedTo({ tool: "stamp-duty-calculator" }).length).toBeGreaterThan(0);
  });
});
