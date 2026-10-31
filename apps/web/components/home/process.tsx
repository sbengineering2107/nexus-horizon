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
        <div className="process-track relative mt-12">
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-0.5 bg-forest/15 lg:inset-x-0 lg:top-0 lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-auto" />
          <div
            aria-hidden="true"
            data-fx="progress-line"
            className="fx-progress-line process-line absolute top-2 bottom-2 left-[7px] w-0.5 bg-forest lg:inset-x-0 lg:top-0 lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-auto"
          />
          <ol className="grid gap-10 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="reveal relative pl-10 lg:pt-9 lg:pl-0">
                <span
                  aria-hidden="true"
                  data-fx="step-dot"
                  className={`fx-step-dot-${i} absolute top-1 left-0 h-4 w-4 rounded-full border-2 border-forest bg-white lg:-top-[7px]`}
                />
                <span className="text-sm font-semibold tabular-nums text-forest">Step {i + 1}</span>
                <h3 className="mt-2 text-xl">{step.title}</h3>
                <p className="mt-2 text-[0.95rem] text-slate">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
