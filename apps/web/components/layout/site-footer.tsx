import Link from "next/link";
import { siteConfig } from "@/site.config";
import { getServices } from "@/lib/content/services";
import { getTools, type ToolSlug } from "@/lib/content/tools";
import { getArea } from "@/lib/content/areas";
import { CATEGORIES } from "@/lib/content/blog";
import { callHref } from "@/lib/cta";
import { WhatsAppLink } from "@/components/contact/whatsapp-link";
import { LogoBadge } from "./logo";

/** Footer labels for calculators: the page titles are long for a link list. */
const TOOL_LABEL: Record<ToolSlug, string> = {
  "loan-eligibility-calculator": "Loan eligibility",
  "home-loan-calculator": "Home loan planner",
  "emi-calculator": "EMI calculator",
  "loan-transfer-calculator": "Balance transfer",
  "stamp-duty-calculator": "Stamp duty",
  "rental-yield-calculator": "Rental yield",
};

const AREAS = { "West Pune": ["baner", "wakad", "hinjewadi", "kothrud"], "East Pune": ["kharadi", "viman-nagar", "hadapsar", "wagholi"] };

const COMPANY = [
  { href: "/about", label: "About us" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact", label: "Contact us" },
];

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.city}`,
)}`;

const linkClass =
  "inline-flex min-h-8 items-center rounded-sm py-1 text-[0.95rem] text-mist/90 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-sans text-sm font-semibold text-gold">{title}</h2>
      <ul className="mt-3 space-y-0.5">{children}</ul>
    </nav>
  );
}

function Item({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    </li>
  );
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-deep">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-sm text-mist/70">{label}</span>
        <span className="block font-semibold text-paper">{children}</span>
      </span>
    </span>
  );
}

const rowClass =
  "group block rounded-lg border border-paper/10 px-4 py-3 transition-colors hover:border-gold/60 hover:bg-paper/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const icon = (d: string, fill = false) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export function SiteFooter() {
  const { address } = siteConfig;
  return (
    <footer className="mt-auto bg-navy-deep text-mist">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <LogoBadge />
              <span className="text-xl font-semibold text-paper">{siteConfig.name}</span>
            </div>
            <p className="mt-4 text-mist/80">{siteConfig.description}</p>
            <ul aria-label="Contact" className="mt-7 space-y-3">
              <li>
                <a href={callHref} className={rowClass}>
                  <ContactRow label="Call us" icon={icon("M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2")}>
                    {siteConfig.phone}
                  </ContactRow>
                </a>
              </li>
              <li>
                <WhatsAppLink className={rowClass}>
                  <ContactRow
                    label="WhatsApp"
                    icon={icon(
                      "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2",
                      true,
                    )}
                  >
                    Chat with an advisor
                  </ContactRow>
                </WhatsAppLink>
              </li>
              <li>
                <a href={MAPS} target="_blank" rel="noopener" className={rowClass}>
                  <address className="not-italic">
                    <ContactRow label="Office" icon={icon("M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6")}>
                      {address.street}, {address.city}
                    </ContactRow>
                  </address>
                </a>
              </li>
              {siteConfig.email && (
                <li>
                  <a href={`mailto:${siteConfig.email}`} className={rowClass}>
                    <ContactRow label="Email" icon={icon("M4 6h16v12H4zM4 7l8 6 8-6")}>
                      {siteConfig.email}
                    </ContactRow>
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:pt-2">
            <div className="space-y-10">
              <Group title="Services">
                {getServices().map((s) => (
                  <Item key={s.slug} href={`/services/${s.slug}`}>
                    {s.title}
                  </Item>
                ))}
              </Group>
              <Group title="Company">
                {COMPANY.map((c) => (
                  <Item key={c.href} href={c.href}>
                    {c.label}
                  </Item>
                ))}
              </Group>
            </div>
            <div className="space-y-10">
              <Group title="Calculators">
                {getTools().map((t) => (
                  <Item key={t.slug} href={`/calculators/${t.slug}`}>
                    {TOOL_LABEL[t.slug]}
                  </Item>
                ))}
                <Item href="/calculators">All calculators</Item>
              </Group>
              <Group title="Guides">
                {CATEGORIES.map((c) => (
                  <Item key={c.id} href={`/blog/category/${c.id}`}>
                    {c.name}
                  </Item>
                ))}
                <Item href="/blog">All guides</Item>
              </Group>
            </div>
            <div className="col-span-2 md:col-span-1">
              <Group title="Pune areas">
                {Object.entries(AREAS).map(([zone, slugs]) => (
                  <li key={zone} className="pb-3">
                    <p className="pt-1 text-sm text-mist/60">{zone}</p>
                    <ul className="mt-1 grid grid-cols-2 gap-x-6 md:grid-cols-1">
                      {slugs.map((slug) => {
                        const a = getArea(slug);
                        return a ? <Item key={slug} href={`/pune/${slug}`}>{a.name}</Item> : null;
                      })}
                    </ul>
                  </li>
                ))}
                <Item href="/pune">All 28 areas</Item>
              </Group>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 pt-6 pb-36 text-sm text-mist/70 sm:px-6 md:flex-row md:items-center md:justify-between md:pb-6 lg:px-8">
          <p data-testid="maharera" className="font-semibold text-mist/90">
            MahaRERA registration no. {siteConfig.maharera}
          </p>
          <p>Images are illustrative and do not show specific projects.</p>
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}
