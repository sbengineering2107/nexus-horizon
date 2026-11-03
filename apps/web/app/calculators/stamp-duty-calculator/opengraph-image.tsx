import { calculatorOgImage } from "@/lib/seo/og-pages";
import { OG_SIZE, OG_TYPE } from "@/lib/seo/og-image";

export const size = OG_SIZE;
export const contentType = OG_TYPE;
export const alt = "Home loan and property calculator";

export default function Image() {
  return calculatorOgImage("stamp-duty-calculator");
}
