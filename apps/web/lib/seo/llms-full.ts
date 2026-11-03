import { siteConfig } from "@/site.config";
import { getServices } from "@/lib/content/services";
import { getTools } from "@/lib/content/tools";
import { areaFaqs, getAreasByZone, ZONES } from "@/lib/content/areas";
import { CATEGORIES, getPostsByCategory } from "@/lib/content/blog";
import { GENERAL_FAQS, PRINCIPLES, STEPS, type Faq } from "@/lib/content/company";
import { officialSources } from "@/lib/content/official-sources";
import { absoluteUrl } from "./metadata";

/** Root-relative markdown links become absolute; placeholder notes are dropped. */
function clean(md: string): string {
  return md
    .replace(/\]\((\/[^)\s]*)\)/g, (_, path: string) => `](${absoluteUrl(path)})`)
    .split("\n")
    .filter((l) => !/placeholder/i.test(l))
    .join("\n")
    .trim();
}

const faqs = (list: Faq[]) => list.flatMap((f) => [`**${f.q}**`, f.a, ""]);

/** llms-full.txt: the whole site's substance as one Markdown document for AI assistants. */
export function llmsFull(): string {
  const out: string[] = [
    `# ${siteConfig.name}: full content`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Pune real estate advisory. MahaRERA agent registration ${siteConfig.maharera}. Office: ${siteConfig.address.street}, ${siteConfig.address.city}. Phone and WhatsApp ${siteConfig.phone}. Consultations are always free. Site: ${siteConfig.url}`,
    "",
    "## About",
    "",
    ...PRINCIPLES.flatMap((p) => [`- **${p.title}.** ${p.text}`]),
    "",
    "## How we work",
    "",
    ...STEPS.flatMap((s, i) => [`### Step ${i + 1}: ${s.title}`, "", s.summary, "", ...s.youGet.map((g) => `- ${g}`), ""]),
    "## Frequently asked questions",
    "",
    ...faqs(GENERAL_FAQS),
    "## Services",
    "",
  ];
  for (const s of getServices()) {
    out.push(`### ${s.title}`, "", `URL: ${absoluteUrl(`/services/${s.slug}`)}`, "", s.summary, "", clean(s.raw).replace(/^## /gm, "#### "), "", ...faqs(s.faqs));
  }
  out.push("## Calculators", "");
  for (const t of getTools()) {
    out.push(`### ${t.title}`, "", `URL: ${absoluteUrl(`/calculators/${t.slug}`)}`, "", t.short, "", ...faqs(t.faqs));
  }
  out.push("## Pune area guides", "");
  for (const z of ZONES) {
    out.push(`### ${z.name}`, "", z.intro, "");
    for (const a of getAreasByZone(z.id)) {
      out.push(
        `#### ${a.name}`,
        "",
        `URL: ${absoluteUrl(`/pune/${a.slug}`)}`,
        "",
        a.summary,
        "",
        `- Local body: ${a.civicNote}`,
        ...a.knownFor.map((k) => `- Known for: ${k}`),
        ...a.connectivity.map((c) => `- Connectivity: ${c}`),
        `- Suits: ${a.suits}`,
        "",
        ...faqs(areaFaqs(a)),
      );
    }
  }
  out.push("## Property guides", "");
  for (const c of CATEGORIES) {
    for (const p of getPostsByCategory(c.id)) {
      const sources = officialSources(p.sources);
      out.push(
        `### ${p.title}`,
        "",
        `URL: ${absoluteUrl(`/blog/${p.slug}`)} | Category: ${c.name} | Updated: ${p.updated}`,
        "",
        `Short answer: ${p.summary}`,
        "",
        clean(p.raw).replace(/^### /gm, "##### ").replace(/^## /gm, "#### "),
        "",
        ...faqs(p.faqs),
        ...(sources.length ? ["Official sources:", ...sources.map((u) => `- ${u}`), ""] : []),
      );
    }
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}
