import Image from "next/image";
import Link from "next/link";
import { Container } from "@nh/ui";
import { getServices } from "@/lib/content/services";
import { serviceImages } from "@/lib/images";

export function ServicesList() {
  const services = getServices();
  return (
    <section id="services" aria-labelledby="services-heading" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 id="services-heading" className="text-3xl sm:text-[2.6rem]">
              Advice for every way of buying in Pune
            </h2>
          </div>
          <Link href="/services" className="font-semibold text-forest underline-offset-4 hover:underline">
            Compare all services
          </Link>
        </div>
        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const img = serviceImages[s.slug];
            return (
              <li key={s.slug} className="reveal">
                <Link href={`/services/${s.slug}`} className="group block focus-visible:outline-offset-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      quality={70}
                      placeholder="blur"
                      className="fx-card-parallax object-cover"
                      data-fx="card-parallax"
                    />
                  </div>
                  <h3 className="mt-5 text-xl group-hover:text-forest">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] text-slate">{s.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
