import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@nh/ui";
import { getServices } from "@/lib/content/services";
import { GENERAL_FAQS } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { CtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = buildMetadata({
  title: "FAQs: Buying Property in Pune with Nexus Horizon",
  description:
    "Answers on working with Nexus Horizon Advisors and on buying new projects, ready-to-move homes, resale flats and commercial space in Pune.",
  path: "/faq",
});

export default function FaqPage() {
  const services = getServices();
  const all = [...GENERAL_FAQS, ...services.flatMap((s) => s.faqs)];
  return (
    <>
      <JsonLd data={faqJsonLd(all)} />
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "FAQs", path: "/faq" }]} />
        <h1 className="mt-8 max-w-3xl text-4xl sm:text-5xl">Frequently asked questions</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate">
          About working with us, and about each kind of purchase. For costs, loans and area comparisons, see our{" "}
          <Link href="/blog" className="font-semibold text-navy underline-offset-4 hover:underline">
            property guides
          </Link>
          .
        </p>
        <nav aria-label="FAQ topics" className="mt-8 flex flex-wrap gap-2">
          {[{ id: "general", title: "Working with us" }, ...services.map((s) => ({ id: s.slug, title: s.title }))].map((t) => (
            <a
              key={t.id}
              href={`#faq-${t.id}`}
              className="rounded-full border border-line bg-white px-4 py-1.5 text-[0.95rem] text-basalt transition-colors hover:border-navy hover:text-navy"
            >
              {t.title}
            </a>
          ))}
        </nav>
        <div className="mt-14 max-w-[72ch] space-y-16">
          <FaqList faqs={GENERAL_FAQS} heading="Working with us" id="faq-general" jsonLd={false} />
          {services.map((s) => (
            <FaqList key={s.slug} faqs={s.faqs} heading={s.title} id={`faq-${s.slug}`} jsonLd={false}>
              <p className="mt-2 text-slate">
                {s.summary}{" "}
                <Link href={`/services/${s.slug}`} className="font-semibold text-navy underline-offset-4 hover:underline">
                  More on {s.title.toLowerCase()}
                </Link>
              </p>
            </FaqList>
          ))}
        </div>
      </Container>
      <CtaBand
        pagePath="/faq"
        heading="Didn't find your question?"
        text="Ask us directly. Consultations are always free, on WhatsApp, a call or in person."
      />
    </>
  );
}
