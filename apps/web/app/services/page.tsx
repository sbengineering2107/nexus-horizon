import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@nh/ui";
import { getServices } from "@/lib/content/services";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = buildMetadata({
  title: "Real Estate Advisory Services in Pune",
  description:
    "New project advisory, ready-to-move homes, resale flats and commercial space in Pune. See how Nexus Horizon Advisors helps at each step.",
  path: "/services",
});

export default function ServicesPage() {
  const services = getServices();
  return (
    <>
      <Container className="py-12 sm:py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
        <h1 className="mt-6 max-w-3xl text-4xl sm:text-5xl">Real estate advisory services in Pune</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate">
          Whether you are buying your first home, moving into something ready today, buying from an owner or finding
          space for your business, here is how we help.
        </p>
        <ul className="mt-12 divide-y divide-mist-strong border-y border-mist-strong">
          {services.map((s) => (
            <li key={s.slug} className="grid gap-3 py-8 md:grid-cols-[1fr_1.4fr] md:gap-10">
              <h2 className="text-2xl sm:text-3xl">
                <Link href={`/services/${s.slug}`} className="hover:text-navy hover:underline">
                  {s.title}
                </Link>
              </h2>
              <div>
                <p className="text-slate">{s.summary}</p>
                <Link href={`/services/${s.slug}`} className="mt-3 inline-block font-semibold text-navy underline-offset-4 hover:underline">
                  How {s.title.toLowerCase()} works
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Container>
      <CtaBand
        pagePath="/services"
        heading="Not sure which fits?"
        text="Describe what you're looking for and we'll point you to the right starting place."
      />
    </>
  );
}
