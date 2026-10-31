import Image from "next/image";
import Link from "next/link";
import { Container } from "@nh/ui";
import { heroImage } from "@/lib/images";
import { getServices } from "@/lib/content/services";
import { siteConfig } from "@/site.config";
import { EnquiryCard } from "./enquiry-card";

export function Hero() {
  const services = getServices().map((s) => ({ slug: s.slug, title: s.title }));
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        preload
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        quality={60}
        className="fx-hero-parallax -z-20 object-cover object-[72%_center] lg:object-center"
        data-fx="hero-parallax"
      />
      {/* Darken only where the text sits, so the photo stays bright on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b1f1d]/80 via-[#0b1f1d]/55 to-[#0b1f1d]/70 lg:bg-gradient-to-r lg:from-[#0b1f1d]/85 lg:via-[#0b1f1d]/45 lg:to-transparent"
      />
      <Container className="flex min-h-[min(78vh,700px)] flex-col justify-center py-14 lg:py-16">
        <div className="hero-rise max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-marigold" />
            MahaRERA registered, no. {siteConfig.maharera}
          </p>
          <h1 className="mt-6 text-[2.6rem] leading-[1.04] text-white sm:text-6xl lg:text-[4.25rem]">
            Property in Pune, chosen with clear eyes.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">
            We shortlist, verify and visit with you, so you buy on facts, not brochures. Your first consultation is
            free.
          </p>
        </div>
        <div className="hero-rise mt-9 max-w-2xl rounded-lg bg-white p-5 shadow-2xl shadow-black/25 [animation-delay:120ms] sm:p-6">
          <EnquiryCard services={services} />
          <p className="mt-4 text-sm text-slate">
            Planning a budget?{" "}
            <Link href="/tools/loan-eligibility-calculator" className="font-semibold text-forest underline-offset-4 hover:underline">
              Check your loan eligibility
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
