import Link from "next/link";
import { Button, Container } from "@nh/ui";
import { getServices } from "@/lib/content/services";
import { consultationHref } from "@/lib/cta";
import { Logo } from "./logo";

export function SiteHeader() {
  const services = getServices();
  return (
    <header className="sticky top-0 z-40 border-b border-mist-strong/60 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded-sm focus:bg-forest focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Nexus Horizon Advisors, home" className="rounded-sm">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 text-[0.95rem] lg:flex">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="text-slate hover:text-forest">
              {s.title}
            </Link>
          ))}
        </nav>
        <Button asChild variant="primary" className="hidden sm:inline-flex">
          <a href={consultationHref("/")} target="_blank" rel="noopener">
            Book a free consultation
          </a>
        </Button>
        <Link href="/services" className="font-semibold text-forest sm:hidden">
          Services
        </Link>
      </Container>
    </header>
  );
}
