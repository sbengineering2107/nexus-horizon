import Image from "next/image";
import { Container } from "@nh/ui";
import { interiorImage } from "@/lib/images";

const POINTS = [
  {
    title: "Verified before it's shortlisted",
    text: "MahaRERA registration, approvals, possession dates and the developer's delivery record are checked before a project reaches you.",
  },
  {
    title: "Honest trade-offs, in writing",
    text: "Each option comes with what's good and what isn't, so you compare homes on facts rather than brochures.",
  },
  {
    title: "One advisor from first call to keys",
    text: "The person who understands your brief is the one who visits sites with you and stays through booking and registration.",
  },
];

export function WhyUs() {
  return (
    <section aria-labelledby="why-heading" className="bg-white py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg lg:aspect-square">
          <Image
            src={interiorImage.src}
            alt={interiorImage.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            quality={70}
            placeholder="blur"
            className="object-cover"
          />
        </div>
        <div className="reveal">
          <h2 id="why-heading" className="text-3xl sm:text-[2.6rem]">
            Why buyers in Pune work with us
          </h2>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {POINTS.map((p) => (
              <div key={p.title} className="py-6">
                <dt className="font-display text-xl text-navy-deep">{p.title}</dt>
                <dd className="mt-2 text-slate">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
