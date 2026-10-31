import Image from "next/image";
import Link from "next/link";
import { Container } from "@nh/ui";
import { heroImage } from "@/lib/images";
import { getServices } from "@/lib/content/services";
import { EnquiryCard } from "./enquiry-card";
import { Skyline } from "./skyline";

export function Hero() {
  const services = getServices().map((s) => ({ slug: s.slug, title: s.title }));
  return (
    <section className="bg-white">
      <Container className="grid items-center gap-10 pt-10 pb-8 sm:pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-9 lg:pb-4">
        <div className="hero-rise">
          <p className="text-[0.95rem] font-semibold text-forest">Real estate advisors in Pune</p>
          <h1 className="mt-3 max-w-xl text-[2.4rem] leading-[1.06] sm:text-[3.2rem] lg:text-[3.4rem]">
            Property in Pune, chosen with clear eyes.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-slate">
            We shortlist, verify and visit with you. Every project is checked on MahaRERA before it reaches your list,
            and your first consultation is free.
          </p>
          <EnquiryCard services={services} />
          <p className="mt-6 text-sm text-slate">
            Planning a budget?{" "}
            <Link href="/tools/emi-calculator" className="font-semibold text-forest underline-offset-4 hover:underline">
              Try the EMI calculator
            </Link>
          </p>
        </div>
        <div className="hero-rise relative aspect-[16/11] overflow-hidden rounded-lg [animation-delay:120ms] lg:aspect-[5/4]">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            preload
            fetchPriority="high"
            loading="eager"
            sizes="(min-width: 1024px) 45vw, 100vw"
            quality={70}
            className="fx-hero-parallax object-cover"
            data-fx="hero-parallax"
          />
        </div>
      </Container>
      <Container>
        <Skyline className="mx-auto max-h-24 sm:max-h-28 lg:max-h-24" />
      </Container>
    </section>
  );
}
