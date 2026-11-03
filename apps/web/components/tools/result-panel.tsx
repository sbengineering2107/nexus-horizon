import { whatsappHref } from "@/lib/contact-links";
import { siteConfig } from "@/site.config";

/** Right-hand results column shared by the calculators. */
export function ResultPanel({ children, message }: { children: React.ReactNode; message: string }) {
  return (
    <div aria-live="polite" className="flex flex-col justify-between rounded-md bg-paper p-6">
      <div>{children}</div>
      <a
        href={whatsappHref(siteConfig.whatsapp, message)}
        target="_blank"
        rel="noopener"
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-5 font-semibold text-paper transition-colors hover:bg-navy-deep"
      >
        Talk to an expert
      </a>
    </div>
  );
}

export function ResultRow({ label, value, strong, testId }: { label: string; value: string; strong?: boolean; testId?: string }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "font-semibold" : ""}`}>
      <dt className={strong ? "" : "text-slate"}>{label}</dt>
      <dd data-testid={testId} className="tabular-nums">
        {value}
      </dd>
    </div>
  );
}

export function CalculatorShell({ inputs, results }: { inputs: React.ReactNode; results: React.ReactNode }) {
  return (
    <div className="grid gap-8 rounded-lg border border-line bg-white p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div className="space-y-7">{inputs}</div>
      {results}
    </div>
  );
}
