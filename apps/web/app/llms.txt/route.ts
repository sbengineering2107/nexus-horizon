import { siteConfig } from "@/site.config";
import { getServices } from "@/lib/content/services";
import { getTools } from "@/lib/content/tools";
import { absoluteUrl } from "@/lib/seo/metadata";

export const dynamic = "force-static";

/** llms.txt (https://llmstxt.org): a plain-text map of the site for AI assistants. */
export function GET(): Response {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `Pune-based real estate advisory. MahaRERA agent registration ${siteConfig.maharera}. Phone ${siteConfig.phone}. Email ${siteConfig.email}.`,
    "",
    "## Services",
    "",
    ...getServices().map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`),
    "",
    "## Tools",
    "",
    ...getTools().map((t) => `- [${t.title}](${absoluteUrl(`/calculators/${t.slug}`)}): ${t.short}`),
    "",
    "## Site",
    "",
    `- [Home](${absoluteUrl("/")})`,
    `- [All services](${absoluteUrl("/services")})`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
