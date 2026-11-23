import { siteConfig } from "@/site.config";
import { getServices } from "@/lib/content/services";
import { getTools } from "@/lib/content/tools";
import { getAreas, getAreasByZone, ZONES } from "@/lib/content/areas";
import { absoluteUrl } from "@/lib/seo/metadata";
import { CATEGORIES, getPostsByCategory } from "@/lib/content/blog";

export const dynamic = "force-static";

const DAYS: Record<string, string> = { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" };
/** "Mo-Sa 10:00-19:00" → "Monday to Saturday, 10:00 to 19:00". */
const readableHours = (h: string) =>
  h.replace(/^(\w\w)-(\w\w) (\d\d:\d\d)-(\d\d:\d\d)$/, (_, a, b, from, to) => `${DAYS[a]} to ${DAYS[b]}, ${from} to ${to}`);

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
    "## Key facts",
    "",
    "- Independent real estate advisory for buyers in Pune: new projects, ready-to-move homes, resale flats, and office and commercial space.",
    "- Consultations are always free.",
    `- Registered with MahaRERA as a real estate agent, registration no. ${siteConfig.maharera}.`,
    `- Covers ${getAreas().length} Pune areas across West and East Pune (listed below).`,
    `- Office hours: ${readableHours(siteConfig.hours)}.`,
    "- An advisory, not a developer, bank or lender; it does not guarantee prices, returns, loans or possession dates.",
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
    `- [About us](${absoluteUrl("/about")}): who we are, MahaRERA registration and office`,
    `- [How we work](${absoluteUrl("/how-we-work")}): our four-step process and what we check`,
    `- [FAQs](${absoluteUrl("/faq")})`,
    `- [Contact](${absoluteUrl("/contact")}): phone, WhatsApp, office and enquiry form`,
    `- [Privacy policy](${absoluteUrl("/privacy-policy")})`,
    `- [Terms of use and disclaimer](${absoluteUrl("/terms")})`,
    `- [All guides](${absoluteUrl("/blog")}) (RSS: ${absoluteUrl("/blog/rss.xml")})`,
    `- [Full site content for AI assistants](${absoluteUrl("/llms-full.txt")})`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
