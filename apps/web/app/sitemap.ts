import type { MetadataRoute } from "next";
import { getServices } from "@/lib/content/services";
import { getTools } from "@/lib/content/tools";
import { getAreas } from "@/lib/content/areas";
import { CATEGORIES, getPosts, getPostsByCategory } from "@/lib/content/blog";
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
    { url: absoluteUrl("/pune"), lastModified: latest, changeFrequency: "monthly", priority: 0.8 },
    ...getAreas().map((a) => ({
      url: absoluteUrl(`/pune/${a.slug}`),
      lastModified: a.updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/blog"), lastModified: getPosts()[0]?.updated ?? latest, changeFrequency: "weekly", priority: 0.8 },
    ...CATEGORIES.filter((c) => getPostsByCategory(c.id).length > 0).map((c) => ({
      url: absoluteUrl(`/blog/category/${c.id}`),
      lastModified: getPostsByCategory(c.id)[0]!.updated,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...getPosts().map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
