import type { MetadataRoute } from "next";
import { getServices } from "@/lib/content/services";
import { getTools } from "@/lib/content/tools";
import { absoluteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = getServices();
  const latest = services.map((s) => s.updated).sort().at(-1);
  return [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/services"), lastModified: latest, changeFrequency: "monthly", priority: 0.8 },
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: s.updated,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl("/calculators"), lastModified: latest, changeFrequency: "monthly", priority: 0.7 },
    ...getTools().map((t) => ({
      url: absoluteUrl(`/calculators/${t.slug}`),
      lastModified: t.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
