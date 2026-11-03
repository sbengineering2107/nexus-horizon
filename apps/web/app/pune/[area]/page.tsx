import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@nh/ui";
import { areaFaqs, getArea, getAreas, ZONES } from "@/lib/content/areas";
import { getServices } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { placeJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FaqList } from "@/components/shared/faq-list";

type Props = { params: Promise<{ area: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAreas().map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArea((await params).area);
  if (!a) return {};
  return buildMetadata({
    title: `${a.name}, Pune: Area Guide for Home Buyers`,
    description: `${a.summary} Connectivity, who it suits, and property advice in ${a.name}.`.slice(0, 160),
    path: `/pune/${a.slug}`,
  });
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });
const SERVICE_PHRASE: Record<string, (area: string) => string> = {
  "new-projects": (n) => `New projects in ${n}`,
  "ready-to-move": (n) => `Ready-to-move flats in ${n}`,
  resale: (n) => `Resale flats in ${n}`,
  commercial: (n) => `Office and commercial space in ${n}`,
};

export default async function AreaPage({ params }: Props) {
  const a = getArea((await params).area);
  if (!a) notFound();
  const path = `/pune/${a.slug}`;
  const zone = ZONES.find((z) => z.id === a.zone)!;
  const nearby = a.nearby.map((s) => getArea(s)).filter((x): x is NonNullable<typeof x> => x !== null);
  const municipal = a.civicBody === "PMC" || a.civicBody === "PCMC";

  return (
    <>
      <JsonLd data={placeJsonLd({ name: a.name, summary: a.summary, path })} />
      <section className="border-b border-line bg-white">
        <Container className="pt-10 pb-12 sm:pt-14">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Pune areas", path: "/pune" },
              { name: a.name, path },
            ]}
          />
          <p className="mt-8 text-[0.95rem] font-semibold text-navy">{zone.name}</p>
          <h1 className="mt-2 max-w-3xl text-4xl sm:text-[3.2rem]">{a.name}, Pune: area guide</h1>
          <p className="mt-5 max-w-[62ch] text-lg text-slate">{a.summary}</p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <article>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-white p-6">
                <h2 className="text-xl">What {a.name} is known for</h2>
                <ul className="mt-4 space-y-2.5 text-slate">
                  {a.knownFor.map((k) => (
                    <li key={k} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-line bg-white p-6">
                <h2 className="text-xl">Getting around</h2>
                <ul className="mt-4 space-y-2.5 text-slate">
                  {a.connectivity.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-line bg-white p-6">
              <h2 className="text-xl">Who {a.name} suits</h2>
              <p className="mt-3 text-slate">{a.suits}</p>
            </div>

            <div className="mt-6 rounded-lg bg-mist/60 p-6">
              <h2 className="text-xl">Local body and stamp duty</h2>
              <p className="mt-3 text-slate">{a.civicNote}</p>
              <p className="mt-3 text-slate">
                {municipal ? (
                  <>
                    As a municipal area, the{" "}
                    <Link href="/calculators/stamp-duty-calculator" className="font-semibold text-navy underline-offset-4 hover:underline">
                      Pune stamp duty calculator
                    </Link>{" "}
                    rates apply.
                  </>
                ) : (
                  <>
                    Stamp duty outside municipal limits can differ from the{" "}
                    <Link href="/calculators/stamp-duty-calculator" className="font-semibold text-navy underline-offset-4 hover:underline">
                      municipal rates in our calculator
                    </Link>
                    ; confirm with the sub-registrar for a specific property.
                  </>
                )}
              </p>
            </div>

            <section aria-labelledby="area-services" className="mt-12">
              <h2 id="area-services" className="text-2xl sm:text-3xl">
                How we help in {a.name}
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {getServices().map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="flex h-full items-center justify-between gap-4 rounded-md border border-line bg-white px-5 py-4 font-semibold text-navy-deep transition-colors hover:border-navy"
                    >
                      {SERVICE_PHRASE[s.slug]?.(a.name) ?? s.title}
                      <span aria-hidden="true" className="text-navy"><svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-14">
              <FaqList faqs={areaFaqs(a)} heading={`${a.name}: frequently asked questions`} />
            </div>

            <div className="mt-10 text-sm text-slate">
              <p>
                Last reviewed <time dateTime={a.updated}>{dateFmt.format(new Date(a.updated))}</time>. Sources:{" "}
                {a.sources.map((src, i) => (
                  <span key={src}>
                    {i > 0 && ", "}
                    <a href={src} className="underline" rel="noopener nofollow" target="_blank">
                      {new URL(src).hostname.replace(/^www\./, "")}
                    </a>
                  </span>
                ))}
                .
              </p>
            </div>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Nearby areas">
              <h2 className="font-sans text-base font-semibold text-basalt">Nearby areas</h2>
              <ul className="mt-3 space-y-2">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/pune/${n.slug}`} className="text-navy hover:underline">
                      {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/pune" className="mt-4 inline-block text-sm font-semibold text-navy hover:underline">
                All Pune areas
              </Link>
            </nav>
          </aside>
        </div>
      </Container>
    </>
  );
}
