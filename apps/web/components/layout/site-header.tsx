import Link from "next/link";
import { Button, Container } from "@nh/ui";
import { ConsultLink } from "@/components/contact/consult-link";
import { Logo } from "./logo";

const NAV = [
  { href: "/services", label: "Our Services" },
  { href: "/calculators", label: "Home Loan Calculators" },
  { href: "/pune", label: "Areas We Serve" },
];

export function SiteHeader() {
  return (
    <header data-fx="header-shadow" className="fx-header-shadow sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-sm focus:bg-navy focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" aria-label="Nexus Horizon Advisors, home" className="shrink-0 rounded-sm">
          <Logo priority />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-[0.95rem] lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-slate transition-colors hover:text-navy-deep">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild variant="primary" className="hidden min-h-10 whitespace-nowrap px-4 sm:inline-flex">
          <ConsultLink>Book a consultation</ConsultLink>
        </Button>
        <nav aria-label="Main" className="flex gap-5 text-[0.95rem] font-semibold text-navy lg:hidden">
          <Link href="/services">Services</Link>
          <Link href="/calculators">Calculators</Link>
        </nav>
      </Container>
    </header>
  );
}
