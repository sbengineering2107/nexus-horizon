import { Container } from "@nh/ui";

const STEPS = [
  { title: "Tell us your brief", text: "Budget, preferred areas, configuration and when you want to move." },
  { title: "Get a shortlist", text: "Three to five options that genuinely fit, each with honest pros and cons." },
  { title: "Visit together", text: "Accompanied site visits, planned so you see your shortlist in one day." },
  { title: "Decide and close", text: "Negotiation, document checks, booking and registration support." },
];

export function Process() {
  return (
    <section aria-labelledby="process-heading" className="py-16 sm:py-24">
      <Container>
        <h2 id="process-heading" className="text-3xl sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title}>
              <span aria-hidden="true" className="font-display text-5xl text-marigold-deep">
                {i + 1}
              </span>
              <h3 className="mt-2 text-xl">{step.title}</h3>
              <p className="mt-2 text-slate">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
