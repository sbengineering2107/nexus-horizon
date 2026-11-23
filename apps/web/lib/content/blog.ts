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

export type Category = {
  id: CategoryId;
  name: string;
  /** One line under the heading. */
  intro: string;
  /** Meta description for search results, 120–155 characters. */
  description: string;
  /** A short paragraph on who the guides are for and what they cover. */
  more: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "buying-guides",
    name: "Buying guides",
    intro: "Step-by-step checks for buying a new, ready-to-move or resale home in Pune, from MahaRERA to the paperwork.",
    description:
      "Pune home buying guides: check a project on MahaRERA, compare new, ready-to-move and resale flats, and know the documents to see before you pay.",
    more: "Each guide follows the order a purchase actually runs in: shortlisting, checking the project or seller, then the paperwork before any token payment. They are written for first-time buyers as much as for people buying again, and link to the official sources so you can check each step yourself.",
  },
  {
    id: "costs-and-loans",
    name: "Costs and home loans",
    intro: "What a Pune property really costs beyond the quoted price, and how to plan the home loan around it.",
    description:
      "What a flat in Pune really costs: stamp duty, registration, GST and other charges beyond the quoted price, and how to improve home loan eligibility.",
    more: "The quoted price is only part of what you pay. These guides break down the charges that come on top and show how banks work out how much they will lend, so you can set a budget before you visit projects. Our calculators run the same numbers for your own figures.",
  },
  {
    id: "area-comparisons",
    name: "Area comparisons",
    intro: "Side-by-side looks at Pune micro-markets: commute, connectivity, housing and who each one suits.",
    description:
      "Pune area comparisons for home buyers: Baner vs Wakad, Hinjewadi vs Kharadi and more, on commute, connectivity, housing and who each area suits.",
    more: "Choosing the area usually matters more than choosing the building. These comparisons put two Pune micro-markets side by side on travel to work, metro and road links, the kind of housing on offer and the trade-offs, so you can narrow your search before site visits.",
  },
  {
    id: "commercial-and-investment",
    name: "Commercial and investment",
    intro: "Office leasing terms, rental yields and what to weigh before buying property as an investment.",
    description:
      "Office space leasing terms in Pune and what rental yield a flat really earns: guides for businesses renting offices and buyers investing in property.",
    more: "For businesses, the guides explain the lease terms that matter before you sign for an office. For investors, they show how to work out the rental yield a Pune flat really earns after costs, so you can compare it with other uses of the money.",
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
