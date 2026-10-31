import { services } from "#site/content";

export type ServiceSlug = "new-projects" | "ready-to-move" | "resale" | "commercial";

export type Service = {
  slug: ServiceSlug;
  title: string;
  summary: string;
  seoTitle: string;
  seoDescription: string;
  faqs: { q: string; a: string }[];
  order: number;
  updated: string;
  /** Compiled MDX function body; render with <MdxContent code={body} />. */
  body: string;
};

const all: Service[] = [...(services as Service[])].sort((a, b) => a.order - b.order);

export function getServices(): Service[] {
  return all;
}

export function getService(slug: string): Service | null {
  return all.find((s) => s.slug === slug) ?? null;
}
