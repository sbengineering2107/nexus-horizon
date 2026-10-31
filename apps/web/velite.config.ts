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
  }),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { services },
  // Fail the build on any schema error instead of skipping the entry.
  strict: true,
});
