import { getCategory, getPost, getPosts } from "@/lib/content/blog";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Pune property guide";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  return ogImage({ kicker: p ? (getCategory(p.category)?.name ?? "Property guide") : "Property guide", title: p?.title ?? "Pune property guides" });
}
