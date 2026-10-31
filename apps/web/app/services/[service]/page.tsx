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
      <section className="relative isolate overflow-hidden bg-forest-deep">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          preload
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          quality={70}
          className="-z-20 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/95 via-forest-deep/60 to-forest-deep/30" />
        <Container className="pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-20">
          <div className="text-mist [&_a:hover]:text-paper [&_a]:text-mist [&_span]:text-mist/80">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: service.title, path },
              ]}
            />
          </div>
          <h1 className="hero-rise mt-8 max-w-3xl text-4xl text-paper sm:text-6xl">{service.title}</h1>
          <p className="hero-rise mt-5 max-w-[62ch] text-xl text-mist [animation-delay:120ms]">{service.summary}</p>
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
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg bg-mist p-6">
              <h2 className="text-xl">Talk to an advisor</h2>
              <p className="mt-2 text-slate">Free first consultation, on WhatsApp or a call.</p>
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
            <nav aria-label="Other services" className="mt-8">
              <h2 className="font-sans text-base font-semibold text-basalt">Other services</h2>
              <ul className="mt-3 space-y-2">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-forest hover:underline">
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
