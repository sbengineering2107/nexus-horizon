import { Button, Container } from "@nh/ui";
import { consultationHref } from "@/lib/cta";
import { siteConfig } from "@/site.config";
import { HorizonRidge } from "@/components/shared/horizon-ridge";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <Container className="pt-14 pb-6 sm:pt-20 lg:pt-28">
        <p className="text-base font-semibold text-forest">Real estate advisors in Pune</p>
        <h1 className="mt-4 max-w-4xl text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-7xl">
          Property in Pune, chosen with clear eyes.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate sm:text-xl">
          We shortlist, verify and visit with you: new projects, ready-to-move homes, resale flats and commercial
          space. Every project is checked on MahaRERA before it reaches your list. Your first consultation is free.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button asChild variant="primary">
            <a href={consultationHref("/")} target="_blank" rel="noopener">
              Book a free consultation
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href="#services">See what we help with</a>
          </Button>
        </div>
        <p className="mt-8 text-sm text-slate">MahaRERA registration no. {siteConfig.maharera}</p>
      </Container>
      <HorizonRidge className="mt-6" />
    </section>
  );
}
