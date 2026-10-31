import { Container } from "@nh/ui";

const STEPS = [
  { title: "Tell us your brief", text: "Budget, preferred areas, configuration and when you want to move." },
  { title: "Get a shortlist", text: "Three to five options that genuinely fit, each with honest pros and cons." },
  { title: "Visit together", text: "Accompanied site visits, planned so you see your shortlist in one day." },
  { title: "Decide and close", text: "Negotiation, document checks, booking and registration support." },
];

export function Process() {
  return (
    <section aria-labelledby="process-heading" className="border-t border-line bg-paper py-20 sm:py-28">
      <Container>
        <div className="reveal max-w-2xl">
          <h2 id="process-heading" className="text-3xl sm:text-[2.6rem]">
            How it works
          </h2>
        </div>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="reveal border-t border-forest/25 pt-6">
              <span aria-hidden="true" className="text-sm font-semibold tabular-nums text-forest">
                Step {i + 1}
              </span>
              <h3 className="mt-2 text-xl">{step.title}</h3>
              <p className="mt-2 text-[0.95rem] text-slate">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
