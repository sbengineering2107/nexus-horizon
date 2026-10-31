import { faqJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/json-ld";

/** Answer-first FAQ block with FAQPage structured data. Uses native <details> for no-JS accessibility. */
export function FaqList({ faqs, heading = "Frequently asked questions" }: { faqs: { q: string; a: string }[]; heading?: string }) {
  return (
    <section aria-labelledby="faq-heading">
      <JsonLd data={faqJsonLd(faqs)} />
      <h2 id="faq-heading" className="text-2xl sm:text-3xl">
        {heading}
      </h2>
      <div className="mt-6 divide-y divide-mist-strong border-y border-mist-strong">
        {faqs.map((f) => (
          <details key={f.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-forest-deep">
              {f.q}
              <span aria-hidden="true" className="mt-0.5 text-xl leading-none text-forest transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-[68ch] text-slate">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
