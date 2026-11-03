import { Container } from "@nh/ui";
import { StepIllustration, type StepKind } from "./step-illustrations";

const STEPS: { title: string; text: string; icon: StepKind }[] = [
  { title: "Tell us your brief", text: "Budget, preferred areas, configuration and when you want to move.", icon: "brief" },
  { title: "Get a shortlist", text: "Three to five options that genuinely fit, each with honest pros and cons.", icon: "shortlist" },
  { title: "Visit together", text: "Accompanied site visits, planned so you see your shortlist in one day.", icon: "visit" },
  { title: "Decide and close", text: "Negotiation, document checks, booking and registration support.", icon: "close" },
];

export function Process() {
  return (
    <section aria-labelledby="process-heading" className="border-t border-line bg-paper py-20 sm:py-28">
      <Container>
        <div className="reveal max-w-2xl">
          <h2 id="process-heading" className="text-3xl sm:text-[2.6rem]">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate">Four steps from first call to the keys in your hand.</p>
        </div>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} data-testid="step-card" className="reveal relative">
              <div className="relative h-full overflow-hidden rounded-lg border border-line bg-white p-5 pb-7">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-40 right-5 text-5xl leading-none font-semibold tabular-nums text-navy/[0.08]"
                >
                  {i + 1}
                </span>
                <div className="flex h-36 items-center justify-center rounded-md bg-paper">
                  <StepIllustration kind={step.icon} className="h-[7.5rem] w-40" />
                </div>
                <p className="mt-5 px-2 text-sm font-semibold text-navy">Step {i + 1}</p>
                <h3 className="mt-1 px-2 text-xl">{step.title}</h3>
                <p className="mt-2 px-2 text-[0.95rem] text-slate">{step.text}</p>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 -right-[1.35rem] z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-navy lg:flex"
                >
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
