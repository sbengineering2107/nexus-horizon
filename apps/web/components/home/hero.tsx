import Image from "next/image";
import { Container } from "@nh/ui";
import { heroImage } from "@/lib/images";
import { getServices } from "@/lib/content/services";
import { HorizonRidge } from "@/components/shared/horizon-ridge";
import { EnquiryCard } from "./enquiry-card";

export function Hero() {
  const services = getServices().map((s) => ({ slug: s.slug, title: s.title }));
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-paper">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        preload
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        quality={60}
        className="-z-20 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-deep/85 via-forest-deep/55 to-forest-deep/20 lg:bg-gradient-to-r lg:from-forest-deep/90 lg:via-forest-deep/45 lg:to-transparent" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-forest-deep/70 to-transparent" />
      <Container className="grid items-end gap-10 pt-16 pb-10 sm:pt-24 lg:grid-cols-[1.3fr_1fr] lg:pt-32 lg:pb-16">
        <div className="hero-rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-paper/25 bg-paper/10 px-3.5 py-1.5 text-sm backdrop-blur">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-marigold" />
            Real estate advisors in Pune
          </p>
          <h1 className="mt-6 max-w-3xl text-[2.6rem] leading-[1.04] text-paper sm:text-6xl lg:text-7xl">
            Property in Pune, chosen with clear eyes.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-mist sm:text-xl">
            We shortlist, verify and visit with you. Every project is checked on MahaRERA before it reaches your list,
            and your first consultation is free.
          </p>
        </div>
        <EnquiryCard services={services} />
      </Container>
      <HorizonRidge tone="light" className="relative" />
    </section>
  );
}
