import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button, Container } from "@nh/ui";
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

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <Container className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path },
          ]}
        />
        <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_20rem]">
          <article>
            <h1 className="text-4xl sm:text-5xl">{service.title}</h1>
            <p className="mt-5 max-w-[62ch] text-xl text-slate">{service.summary}</p>
            <p className="mt-4 text-sm text-slate">
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
