import { describe, expect, test } from "vitest";
import { indexNowPayload, siteBlocked, sitemapUrls } from "../../scripts/indexnow-lib.mjs";

describe("IndexNow helpers", () => {
  test("detects a site-wide block and ignores partial disallows", () => {
    expect(siteBlocked("User-Agent: *\nDisallow: /\n")).toBe(true);
    expect(siteBlocked("User-Agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: https://x/sitemap.xml")).toBe(false);
  });

  test("reads sitemap URLs and keeps only this host", () => {
    const urls = sitemapUrls("<urlset><url><loc>https://www.a.com/</loc></url><url><loc>https://www.a.com/blog</loc></url></urlset>");
    expect(urls).toEqual(["https://www.a.com/", "https://www.a.com/blog"]);
    const body = indexNowPayload("https://www.a.com", "k".repeat(32), [...urls, "https://evil.com/x"]);
    expect(body).toEqual({
      host: "www.a.com",
      key: "k".repeat(32),
      keyLocation: `https://www.a.com/${"k".repeat(32)}.txt`,
      urlList: urls,
    });
  });
});
