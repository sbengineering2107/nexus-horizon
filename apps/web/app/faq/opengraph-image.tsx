import { ogImage, OG_SIZE, OG_TYPE } from "@/lib/seo/og-image";
import { STATIC_OG } from "@/lib/seo/og-pages";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = STATIC_OG["/faq"]!.title;

export default function Image() {
  return ogImage(STATIC_OG["/faq"]!);
}
