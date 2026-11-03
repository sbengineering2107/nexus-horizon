import Link from "next/link";
import { Container } from "@nh/ui";
import { siteConfig } from "@/site.config";
import { getServices } from "@/lib/content/services";
import { getTools } from "@/lib/content/tools";
import { callHref } from "@/lib/cta";
import { LogoBadge } from "./logo";

const COMPANY = [
  { href: "/about", label: "About us" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/faq", label: "FAQs" },
  { href: "/blog", label: "Property guides" },
];

export function SiteFooter() {
  const { address } = siteConfig;
  return (
    <footer className="mt-auto bg-navy-deep text-mist">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoBadge />
            <span className="text-lg font-semibold text-paper">{siteConfig.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-mist/85">{siteConfig.description}</p>
          <nav aria-label="Company" className="mt-6">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-semibold text-paper hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <h2 className="font-sans text-base font-semibold text-paper">Our Services</h2>
          <ul className="mt-3 space-y-2">
            {getServices().map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-gold">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-base font-semibold text-paper">Home Loan Calculators</h2>
          <ul className="mt-3 space-y-2">
            {getTools().map((t) => (
              <li key={t.slug}>
                <Link href={`/calculators/${t.slug}`} className="hover:text-gold">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <address className="not-italic">
          <h2 className="font-sans text-base font-semibold text-paper">Office</h2>
          <p className="mt-3">
            {address.street}
            <br />
            {[address.city, address.postalCode].filter(Boolean).join(" ")}, {address.region}
          </p>
          <p className="mt-3">
            <a href={callHref} className="hover:text-gold">
              {siteConfig.phone}
            </a>
            {siteConfig.email && (
              <>
                <br />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
                  {siteConfig.email}
                </a>
              </>
            )}
          </p>
        </address>
      </Container>
      <div className="border-t border-paper/15">
        <Container className="flex flex-col gap-2 pt-5 pb-36 text-sm text-mist/75 md:flex-row md:justify-between md:pb-5">
          <p data-testid="maharera">MahaRERA registration no. {siteConfig.maharera}</p>
          <p>Images are illustrative and do not show specific projects.</p>
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
        </Container>
      </div>
    </footer>
  );
}
