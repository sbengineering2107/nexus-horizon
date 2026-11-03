import { posts } from "#site/content";
import type { ServiceSlug } from "./services";
import type { ToolSlug } from "./tools";

export type CategoryId = "buying-guides" | "costs-and-loans" | "area-comparisons" | "commercial-and-investment";

export type Post = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: CategoryId;
  published: string;
  updated: string;
  summary: string;
  related: { services: ServiceSlug[]; areas: string[]; tools: ToolSlug[] };
  faqs: { q: string; a: string }[];
  sources: string[];
  metadata: { readingTime: number; wordCount: number };
  /** Compiled MDX function body; render with <MdxContent code={body} />. */
  body: string;
  /** Markdown source. */
  raw: string;
};

export type Category = { id: CategoryId; name: string; intro: string };

export const CATEGORIES: Category[] = [
  {
    id: "buying-guides",
    name: "Buying guides",
    intro: "Step-by-step checks for buying a new, ready-to-move or resale home in Pune, from MahaRERA to the paperwork.",
  },
  {
    id: "costs-and-loans",
    name: "Costs and home loans",
    intro: "What a Pune property really costs beyond the quoted price, and how to plan the home loan around it.",
  },
  {
    id: "area-comparisons",
    name: "Area comparisons",
    intro: "Side-by-side looks at Pune micro-markets: commute, connectivity, housing and who each one suits.",
  },
  {
    id: "commercial-and-investment",
    name: "Commercial and investment",
    intro: "Office leasing terms, rental yields and what to weigh before buying property as an investment.",
  },
];

const byNewest = (a: Post, b: Post) => b.published.localeCompare(a.published) || a.title.localeCompare(b.title);
const all: Post[] = [...(posts as Post[])].sort(byNewest);

export function getPosts(): Post[] {
  return all;
}

export function getPost(slug: string): Post | null {
  return all.find((p) => p.slug === slug) ?? null;
}

export function getCategory(id: string): Category | null {
  return CATEGORIES.find((c) => c.id === id) ?? null;
}

export function getPostsByCategory(id: CategoryId): Post[] {
  return all.filter((p) => p.category === id);
}

/** Guides that mention a service, area or calculator, newest first. */
export function postsRelatedTo(ref: { service?: ServiceSlug; area?: string; tool?: ToolSlug }, limit = 3): Post[] {
  return all
    .filter(
      (p) =>
        (ref.service && p.related.services.includes(ref.service)) ||
        (ref.area && p.related.areas.includes(ref.area)) ||
        (ref.tool && p.related.tools.includes(ref.tool)),
    )
    .slice(0, limit);
}

/** Other guides to read next: same category first, then the newest of the rest. */
export function morePosts(post: Post, limit = 3): Post[] {
  const others = all.filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}
