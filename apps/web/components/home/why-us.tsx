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
    <section aria-labelledby="why-heading" className="py-16 sm:py-24">
      <Container>
        <h2 id="why-heading" className="reveal max-w-2xl text-3xl sm:text-5xl">
          Why buyers in Pune work with us
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <div className="reveal relative min-h-72 overflow-hidden rounded-lg lg:col-span-2 lg:row-span-2">
            <Image
              src={interiorImage.src}
              alt={interiorImage.alt}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              quality={70}
              placeholder="blur"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="text-2xl text-paper sm:text-3xl">{POINTS[0]!.title}</h3>
              <p className="mt-2 max-w-lg text-mist/90">{POINTS[0]!.text}</p>
            </div>
          </div>
          {POINTS.slice(1).map((p, i) => (
            <div key={p.title} className={`reveal rounded-lg p-6 sm:p-7 ${i === 0 ? "bg-mist" : "bg-marigold/20"}`}>
              <h3 className="text-xl sm:text-2xl">{p.title}</h3>
              <p className="mt-2 text-slate">{p.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
