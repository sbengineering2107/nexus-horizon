import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@nh/ui";
import { siteConfig } from "@/site.config";
import { getServices } from "@/lib/content/services";
import { PRINCIPLES } from "@/lib/content/company";
import { buildMetadata } from "@/lib/seo/metadata";
import { aboutPageJsonLd } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";

const TITLE = "About Nexus Horizon Advisors";
const DESCRIPTION =
  "Nexus Horizon Advisors is a MahaRERA-registered real estate advisory in Bavdhan, Pune, helping buyers with new projects, ready-to-move homes, resale and commercial space.";

export const metadata: Metadata = buildMetadata({
  title: "About Us: MahaRERA-Registered Real Estate Advisors in Pune",
  description: DESCRIPTION,
  path: "/about",
});

export default function AboutPage() {
  const { address } = siteConfig;
  return (
    <>
      <JsonLd data={aboutPageJsonLd({ title: TITLE, description: DESCRIPTION, path: "/about" })} />
      <section className="border-b border-line bg-white">
        <Container className="pt-10 pb-14 sm:pt-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About us", path: "/about" }]} />
          <h1 className="mt-8 max-w-3xl text-4xl sm:text-[3.2rem]">{TITLE}</h1>
          <p className="mt-5 max-w-[62ch] text-lg text-slate">
            We are a Pune real estate advisory based in Bavdhan. We help people buy new projects, ready-to-move homes
            and resale flats, and help businesses find office and commercial space, with the checks and numbers done
            before anyone asks you to commit.
          </p>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_20rem]">
          <div className="max-w-[68ch]">
            <section aria-labelledby="what-we-do">
              <h2 id="what-we-do" className="text-3xl">
                What we do
              </h2>
              <p className="mt-4 text-slate">
                Buying property in Pune means comparing projects, localities and paperwork that change fast. We do that
                legwork with you, across four kinds of purchase:
              </p>
              <ul className="mt-6 divide-y divide-line border-y border-line">
                {getServices().map((s) => (
                  <li key={s.slug} className="py-4">
                    <Link href={`/services/${s.slug}`} className="text-lg font-semibold text-navy-deep hover:text-navy">
                      {s.title}
                    </Link>
                    <p className="mt-1 text-slate">{s.summary}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="principles" className="mt-16">
              <h2 id="principles" className="text-3xl">
                What we stand for
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {PRINCIPLES.map((p) => (
                  <div key={p.title} className="rounded-lg border border-line bg-white p-6">
                    <h3 className="text-xl">{p.title}</h3>
                    <p className="mt-2 text-slate">{p.text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="where" className="mt-16">
              <h2 id="where" className="text-3xl">
                Where we work
              </h2>
              <p className="mt-4 text-slate">
                Across West and East Pune, from Baner, Bavdhan and Hinjewadi to Kharadi, Viman Nagar and Hadapsar. Our{" "}
                <Link href="/pune" className="font-semibold text-navy underline-offset-4 hover:underline">
                  area guides
                </Link>{" "}
                cover 28 micro-markets, and our{" "}
                <Link href="/blog" className="font-semibold text-navy underline-offset-4 hover:underline">
                  property guides
                </Link>{" "}
                explain the checks, costs and loans behind a purchase.
              </p>
              <p className="mt-4 text-slate">
                To see how an engagement runs from first call to registration, read{" "}
                <Link href="/how-we-work" className="font-semibold text-navy underline-offset-4 hover:underline">
                  how we work
                </Link>
                .
              </p>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-line bg-white p-6">
              <h2 className="font-sans text-base font-semibold text-basalt">MahaRERA registration</h2>
              <p className="mt-2 text-2xl font-semibold tracking-wide text-navy-deep tabular-nums">{siteConfig.maharera}</p>
              <p className="mt-2 text-sm text-slate">
                Registered real estate agent with the Maharashtra Real Estate Regulatory Authority. You can check this
                number in the agent search on the{" "}
                <a
                  href="https://maharera.maharashtra.gov.in/"
                  className="underline"
                  rel="noopener nofollow"
                  target="_blank"
                >
                  MahaRERA website
                </a>
                .
              </p>
            </div>
            <div className="rounded-lg border border-line bg-white p-6">
              <h2 className="font-sans text-base font-semibold text-basalt">Office</h2>
              <address className="mt-2 not-italic text-slate">
                {address.street}
                <br />
                {address.city}, {address.region}
              </address>
              <p className="mt-2 text-slate">{siteConfig.phone}</p>
            </div>
          </aside>
        </div>
      </Container>
      <CtaBand
        pagePath="/about"
        heading="Talk to us about your purchase"
        text="Consultations are always free, on WhatsApp, a call or in person."
      />
    </>
  );
}
