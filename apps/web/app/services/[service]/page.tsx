import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button, Container } from "@nh/ui";
import { serviceImages } from "@/lib/images";
import { getService, getServices } from "@/lib/content/services";
import { MdxContent } from "@/lib/content/mdx-content";
import { buildMetadata } from "@/lib/seo/metadata";
import { serviceJsonLd } from "@/lib/seo/jsonld";
import { consultationHref, whatsappChatHref } from "@/lib/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";
import { CtaBand } from "@/components/shared/cta-band";
import { postsRelatedTo } from "@/lib/content/blog";
import { RelatedGuides } from "@/components/blog/related-guides";
import { LeadForm } from "@/components/leads/lead-form";
import { leadsEnabled } from "@/lib/leads/store";

type Props = { params: Promise<{ service: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getServices().map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).service);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).service);
  if (!service) notFound();
  const path = `/services/${service.slug}`;
  const others = getServices().filter((s) => s.slug !== service.slug);
  const img = serviceImages[service.slug];

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <section className="border-b border-line bg-white">
        <Container className="pt-10 pb-12 sm:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.title, path },
            ]}
          />
          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="hero-rise">
              <h1 className="text-4xl sm:text-[3.2rem]">{service.title}</h1>
              <p className="mt-5 max-w-[56ch] text-lg text-slate">{service.summary}</p>
            </div>
            <div className="hero-rise relative aspect-[16/9] overflow-hidden rounded-lg [animation-delay:120ms]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                preload
                fetchPriority="high"
                loading="eager"
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={70}
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>
      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <article>
            <p className="text-sm text-slate">
              Last updated <time dateTime={service.updated}>{dateFmt.format(new Date(service.updated))}</time>
            </p>
            <div className="prose-nh mt-4">
              <MdxContent code={service.body} />
            </div>
            <div className="mt-14">
              <FaqList faqs={service.faqs} />
            </div>
          </article>
          <aside className={leadsEnabled() ? "" : "lg:sticky lg:top-24 lg:self-start"}>
            {leadsEnabled() ? (
              <div id="call-back" className="rounded-lg border border-line bg-paper p-6">
                <h2 className="text-xl">Request a call back</h2>
                <p className="mt-2 text-slate">Free, no obligation. An advisor will call you about {service.title}.</p>
                <div className="mt-5">
                  <LeadForm formType="quick" sourcePage={path} service={service.slug} compact />
                </div>
                <p className="mt-5 border-t border-line pt-4 text-sm text-slate">
                  Prefer chat?{" "}
                  <a href={whatsappChatHref(path)} target="_blank" rel="noopener" className="font-semibold text-navy underline-offset-4 hover:underline">
                    Ask on WhatsApp
                  </a>
                </p>
              </div>
            ) : (
            <div className="rounded-lg border border-line bg-paper p-6">
              <h2 className="text-xl">Talk to an advisor</h2>
              <p className="mt-2 text-slate">Consultations are always free, on WhatsApp or a call.</p>
              <div className="mt-5 flex flex-col gap-3">
                <Button asChild variant="primary">
                  <a href={consultationHref(path)} target="_blank" rel="noopener">
                    Book a free consultation
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={whatsappChatHref(path)} target="_blank" rel="noopener">
                    Ask on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            )}
            <RelatedGuides posts={postsRelatedTo({ service: service.slug })} className="mt-8" />
            <nav aria-label="Other services" className="mt-8">
              <h2 className="font-sans text-base font-semibold text-basalt">Other services</h2>
              <ul className="mt-3 space-y-2">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-navy hover:underline">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </Container>
      <CtaBand
        pagePath={path}
        heading={`Ready to talk about ${service.title.toLowerCase()}?`}
        text="Share your budget and preferred areas. We'll come back with an honest first view."
      />
    </>
  );
}
