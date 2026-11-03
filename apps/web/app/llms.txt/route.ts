import { siteConfig } from "@/site.config";
import { getServices } from "@/lib/content/services";
import { getTools } from "@/lib/content/tools";
import { getAreasByZone, ZONES } from "@/lib/content/areas";
import { absoluteUrl } from "@/lib/seo/metadata";
import { CATEGORIES, getPostsByCategory } from "@/lib/content/blog";

export const dynamic = "force-static";

/** llms.txt (https://llmstxt.org): a plain-text map of the site for AI assistants. */
export function GET(): Response {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    [
      `Pune-based real estate advisory. MahaRERA agent registration ${siteConfig.maharera}.`,
      `Phone and WhatsApp ${siteConfig.phone}.`,
      siteConfig.email && `Email ${siteConfig.email}.`,
      `Office: ${siteConfig.address.street}, ${siteConfig.address.city}.`,
    ]
      .filter(Boolean)
      .join(" "),
    "",
    "## Services",
    "",
    ...getServices().map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`),
    "",
    "## Tools",
    "",
    ...getTools().map((t) => `- [${t.title}](${absoluteUrl(`/calculators/${t.slug}`)}): ${t.short}`),
    "",
    "## Pune area guides",
    "",
    ...ZONES.flatMap((z) => [
      `### ${z.name}`,
      "",
      ...getAreasByZone(z.id).map((a) => `- [${a.name}](${absoluteUrl(`/pune/${a.slug}`)}): ${a.summary}`),
      "",
    ]),
    "## Guides",
    "",
    ...CATEGORIES.flatMap((c) => {
      const list = getPostsByCategory(c.id);
      if (list.length === 0) return [];
      return [
        `### ${c.name}`,
        "",
        ...list.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.summary}`),
        "",
      ];
    }),
    "## Site",
    "",
    `- [Home](${absoluteUrl("/")})`,
    `- [All services](${absoluteUrl("/services")})`,
    `- [All guides](${absoluteUrl("/blog")}) (RSS: ${absoluteUrl("/blog/rss.xml")})`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
