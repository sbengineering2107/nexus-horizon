import { getArea, getAreas, ZONES } from "@/lib/content/areas";
import { OG_SIZE, OG_TYPE, ogImage } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Pune area guide";

export function generateStaticParams() {
  return getAreas().map((a) => ({ area: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ area: string }> }) {
  const a = getArea((await params).area);
  const zone = ZONES.find((z) => z.id === a?.zone)?.name ?? "Pune";
  return ogImage({ kicker: `${zone} area guide`, title: a ? `${a.name}, Pune` : "Pune area guide" });
}
