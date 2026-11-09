"use client";

import { ExpertLink, usePublishSummary } from "./calc-summary";

/** Right-hand results column shared by the calculators. */
export function ResultPanel({ children, message }: { children: React.ReactNode; message: string }) {
  usePublishSummary(message);
  return (
    <div aria-live="polite" className="flex flex-col justify-between rounded-md bg-paper p-6">
      <div>{children}</div>
      <ExpertLink message={message} />
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
