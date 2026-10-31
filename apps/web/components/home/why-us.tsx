import { Container } from "@nh/ui";

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
    <section aria-labelledby="why-heading" className="bg-mist py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <h2 id="why-heading" className="text-3xl sm:text-4xl">
          Why buyers in Pune work with us
        </h2>
        <dl className="grid gap-8">
          {POINTS.map((p) => (
            <div key={p.title} className="border-l-4 border-forest pl-5">
              <dt className="font-display text-xl text-forest-deep">{p.title}</dt>
              <dd className="mt-2 max-w-[60ch] text-slate">{p.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
