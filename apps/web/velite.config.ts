import remarkGfm from "remark-gfm";
import { defineCollection, defineConfig, s } from "velite";

export const SERVICE_SLUGS = ["new-projects", "ready-to-move", "resale", "commercial"] as const;

const services = defineCollection({
  name: "Service",
  pattern: "services/*.mdx",
  schema: s.object({
    slug: s.enum(SERVICE_SLUGS),
    title: s.string().min(3).max(80),
    summary: s.string().min(20).max(300),
    seoTitle: s.string().min(10).max(70),
    seoDescription: s.string().min(70).max(160),
    order: s.number().int(),
    updated: s.isodate(),
    faqs: s.array(s.object({ q: s.string().min(5), a: s.string().min(20) })).min(3),
    body: s.mdx(),
    /** Markdown source, for llms-full.txt. */
    raw: s.raw(),
  }),
});

const areas = defineCollection({
  name: "Area",
  pattern: "areas/*.json",
  schema: s.object({
    slug: s.string().regex(/^[a-z]+(-[a-z]+)*$/),
    name: s.string().min(3).max(40),
    zone: s.enum(["west", "east"]),
    order: s.number().int(),
    civicBody: s.enum(["PMC", "PCMC", "PMRDA", "Mixed"]),
    civicNote: s.string().min(10).max(260),
    summary: s.string().min(40).max(240),
    knownFor: s.array(s.string().min(5).max(110)).min(2).max(4),
    connectivity: s.array(s.string().min(5).max(120)).min(1).max(4),
    suits: s.string().min(20).max(180),
    nearby: s.array(s.string()).min(2).max(5),
    sources: s.array(s.string().url()).min(1),
    updated: s.isodate(),
  }),
});

export const BLOG_CATEGORIES = ["buying-guides", "costs-and-loans", "area-comparisons", "commercial-and-investment"] as const;
export const TOOL_SLUGS = [
  "loan-eligibility-calculator",
  "home-loan-calculator",
  "emi-calculator",
  "loan-transfer-calculator",
  "stamp-duty-calculator",
  "rental-yield-calculator",
] as const;

const posts = defineCollection({
  name: "Post",
  pattern: "blog/*.mdx",
  schema: s.object({
    slug: s.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    title: s.string().min(10).max(90),
    seoTitle: s.string().min(10).max(62),
    description: s.string().min(110).max(160),
    category: s.enum(BLOG_CATEGORIES),
    published: s.isodate(),
    updated: s.isodate(),
    summary: s.string().min(60).max(320),
    related: s
      .object({
        services: s.array(s.enum(SERVICE_SLUGS)).default([]),
        areas: s.array(s.string()).default([]),
        tools: s.array(s.enum(TOOL_SLUGS)).default([]),
      })
      .default({ services: [], areas: [], tools: [] }),
    faqs: s.array(s.object({ q: s.string().min(5), a: s.string().min(20) })).min(3).max(6),
    sources: s.array(s.string().url()).min(2),
    metadata: s.metadata(),
    body: s.mdx(),
    /** Markdown source, for llms-full.txt. */
    raw: s.raw(),
  }),
});

export default defineConfig({
  mdx: { remarkPlugins: [remarkGfm] },
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { services, areas, posts },
  // Fail the build on any schema error instead of skipping the entry.
  strict: true,
});
