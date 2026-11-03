import { CATEGORIES, getCategory } from "@/lib/content/blog";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Pune property guides";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.id }));
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  return ogImage({ kicker: "Pune property guides", title: c?.name ?? "Guides" });
}
