import Image from "next/image";
import Link from "next/link";
import { Container } from "@nh/ui";
import { getServices } from "@/lib/content/services";
import { serviceImages } from "@/lib/images";

export function ServicesList() {
  const services = getServices();
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <h2 id="services-heading" className="max-w-2xl text-3xl sm:text-5xl">
            Four ways we help you buy, sell or lease
          </h2>
          <Link href="/services" className="font-semibold text-forest underline-offset-4 hover:underline">
            Compare all services
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {services.map((s, i) => {
            const img = serviceImages[s.slug];
            return (
              <li key={s.slug} className={`reveal ${i % 2 ? "sm:translate-y-8" : ""}`}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-lg p-6 text-paper focus-visible:outline-offset-4 sm:p-7"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    quality={70}
                    placeholder="blur"
                    className="-z-20 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep/95 via-forest-deep/45 to-transparent" />
                  <h3 className="text-2xl text-paper sm:text-3xl">{s.title}</h3>
                  <p className="mt-2 max-w-md text-mist/90">{s.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-marigold">
                    How it works
                    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
