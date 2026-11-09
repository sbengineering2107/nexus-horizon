import type { Metadata } from "next";
import { Container } from "@nh/ui";
import { siteConfig } from "@/site.config";
import { getServices } from "@/lib/content/services";
import { getAreas } from "@/lib/content/areas";
import { callHref, whatsappChatHref } from "@/lib/cta";
import { leadsEnabled } from "@/lib/leads/store";
import { buildMetadata } from "@/lib/seo/metadata";
import { contactPageJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { LeadForm } from "@/components/leads/lead-form";

const TITLE = "Contact Nexus Horizon Advisors";
const DESCRIPTION =
  "Book a free consultation with Nexus Horizon Advisors in Bavdhan, Pune: send your requirements, WhatsApp us or call. MahaRERA-registered real estate advisors.";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us: Book a Free Property Consultation in Pune",
  description: DESCRIPTION,
  path: "/contact",
});

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.city}`,
)}`;

export default function ContactPage() {
  const enabled = leadsEnabled();
  const services = getServices().map((s) => ({ value: s.slug, label: s.title }));
  const areas = getAreas()
    .map((a) => ({ value: a.slug, label: a.name }))
    .sort((a, b) => a.label.localeCompare(b.label));
  return (
    <>
      <JsonLd data={contactPageJsonLd({ title: TITLE, description: DESCRIPTION, path: "/contact" })} />
      <section className="border-b border-line bg-white">
        <Container className="pt-10 pb-12 sm:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact us", path: "/contact" }]} />
          <h1 className="mt-8 max-w-3xl text-4xl sm:text-[3.2rem]">Book a free consultation</h1>
          <p className="mt-5 max-w-[62ch] text-lg text-slate">
            {enabled
              ? "Tell us what you're looking for and an advisor will call you back. Prefer to talk now? WhatsApp or call us."
              : "WhatsApp or call us and an advisor will take it from there."}{" "}
            Consultations are always free.
          </p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className={enabled ? "grid gap-12 lg:grid-cols-[1fr_22rem]" : "max-w-xl"}>
          {enabled && (
            <section aria-labelledby="form-heading" className="rounded-lg border border-line bg-white p-6 sm:p-8">
              <h2 id="form-heading" className="text-2xl">
                Your requirements
              </h2>
              <p className="mt-1 text-slate">Only your name and mobile number are required.</p>
              <div className="mt-6">
                <LeadForm formType="consultation" sourcePage="/contact" services={services} areas={areas} submitLabel="Send my requirements" />
              </div>
            </section>
          )}
          <aside aria-label="Other ways to reach us" className="space-y-4">
            <a
              href={whatsappChatHref("/contact")}
              target="_blank"
              rel="noopener"
              className="block rounded-lg border border-line bg-white p-5 transition-colors hover:border-navy"
            >
              <span className="block text-sm text-slate">WhatsApp</span>
              <span className="mt-0.5 block text-lg font-semibold text-navy-deep">Chat with an advisor</span>
            </a>
            <a href={callHref} className="block rounded-lg border border-line bg-white p-5 transition-colors hover:border-navy">
              <span className="block text-sm text-slate">Call us</span>
              <span className="mt-0.5 block text-lg font-semibold text-navy-deep">{siteConfig.phone}</span>
            </a>
            <a
              href={MAPS}
              target="_blank"
              rel="noopener"
              className="block rounded-lg border border-line bg-white p-5 transition-colors hover:border-navy"
            >
              <span className="block text-sm text-slate">Office</span>
              <address className="mt-0.5 not-italic text-lg font-semibold text-navy-deep">
                {siteConfig.address.street}, {siteConfig.address.city}
              </address>
              <span className="mt-1 block text-sm text-navy">Open in Google Maps</span>
            </a>
            <p className="px-1 text-sm text-slate">MahaRERA registration no. {siteConfig.maharera}</p>
          </aside>
        </div>
      </Container>
    </>
  );
}
