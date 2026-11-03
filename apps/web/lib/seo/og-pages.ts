import { getTool } from "@/lib/content/tools";
import { ogImage } from "./og-image";

export function calculatorOgImage(slug: string) {
  return ogImage({ kicker: "Free calculator", title: getTool(slug)?.title ?? "Home loan calculators" });
}

/** Share images for fixed pages, keyed by path. */
export const STATIC_OG: Record<string, { kicker: string; title: string }> = {
  "/services": { kicker: "Our services", title: "Real estate advisory for buyers in Pune" },
  "/pune": { kicker: "Area guides", title: "28 Pune micro-markets, West and East" },
  "/calculators": { kicker: "Free calculators", title: "Home loan, EMI, stamp duty and rental yield calculators" },
  "/blog": { kicker: "Property guides", title: "Pune property guides for buyers and investors" },
  "/about": { kicker: "About us", title: "MahaRERA-registered real estate advisors in Pune" },
  "/how-we-work": { kicker: "How we work", title: "From your brief to registration, in four steps" },
  "/faq": { kicker: "FAQs", title: "Buying property in Pune: your questions answered" },
};
