import { getService, getServices } from "@/lib/content/services";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Nexus Horizon Advisors service";

export function generateStaticParams() {
  return getServices().map((s) => ({ service: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const s = getService((await params).service);
  return ogImage({ kicker: "Our services", title: s ? `${s.title} in Pune` : "Real estate advisory in Pune" });
}
