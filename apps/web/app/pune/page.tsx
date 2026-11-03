import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@nh/ui";
import { getAreasByZone, ZONES } from "@/lib/content/areas";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = buildMetadata({
  title: "Pune Area Guides: West and East Pune Micro-Markets",
  description:
    "Area guides for 28 Pune micro-markets across West and East Pune: Baner, Hinjewadi, Wakad, Kharadi, Viman Nagar, Hadapsar and more, with connectivity and who each suits.",
  path: "/pune",
});

export default function PuneHubPage() {
  return (
    <>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pune areas", path: "/pune" }]} />
        <h1 className="mt-8 max-w-3xl text-4xl sm:text-5xl">Pune area guides</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate">
          Where each micro-market sits, how it connects to work and the airport, and who it tends to suit. Pick an area
          to read its guide, or ask us about current options there.
        </p>
        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          {ZONES.map((z) => {
            const list = getAreasByZone(z.id);
            return (
              <section key={z.id} aria-labelledby={`zone-${z.id}`}>
                <h2 id={`zone-${z.id}`} className="text-3xl">
                  {z.name}
                </h2>
                <p className="mt-2 text-slate">{z.intro}</p>
                <ul className="mt-6 divide-y divide-line border-y border-line">
                  {list.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/pune/${a.slug}`} className="group flex items-start justify-between gap-6 py-4">
                        <span>
                          <span className="block text-lg font-semibold text-navy-deep group-hover:text-navy">{a.name}</span>
                          <span className="mt-0.5 block text-[0.95rem] text-slate">{a.knownFor[0]}</span>
                        </span>
                        <span aria-hidden="true" className="mt-1.5 text-navy transition-transform group-hover:translate-x-1"><svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>
      <CtaBand
        pagePath="/pune"
        heading="Not sure which area fits?"
        text="Tell us where you work, your budget and what matters at home. We'll suggest two or three areas to look at first."
      />
    </>
  );
}
