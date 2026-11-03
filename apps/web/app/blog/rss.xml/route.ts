import { siteConfig } from "@/site.config";
import { getCategory, getPosts } from "@/lib/content/blog";
import { absoluteUrl } from "@/lib/seo/metadata";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed of all guides, newest first. */
export function GET(): Response {
  const posts = getPosts();
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      return [
        "<item>",
        `<title>${esc(p.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${new Date(p.published).toUTCString()}</pubDate>`,
        `<category>${esc(getCategory(p.category)?.name ?? p.category)}</category>`,
        `<description>${esc(p.summary)}</description>`,
        "</item>",
      ].join("");
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(`${siteConfig.name}: Pune property guides`)}</title>
<link>${absoluteUrl("/blog")}</link>
<atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
<description>${esc("Practical guides to buying, financing and investing in Pune property.")}</description>
<language>en-IN</language>
${posts[0] ? `<lastBuildDate>${new Date(posts[0].updated).toUTCString()}</lastBuildDate>` : ""}
${items}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
