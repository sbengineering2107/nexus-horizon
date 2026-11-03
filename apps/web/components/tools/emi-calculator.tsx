"use client";

import { useState } from "react";
import { calculateEmi } from "@/lib/calculators/emi";
import { formatInr, formatInrShort } from "@/lib/format";
import { whatsappHref } from "@/lib/contact-links";
import { siteConfig } from "@/site.config";
import { NumberField } from "./number-field";

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(5_000_000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const result = calculateEmi({ principal, annualRatePct: rate, years });
  const interestShare = result ? Math.round((result.totalInterest / result.totalPayable) * 100) : 0;

  const message = result
    ? `Hi Nexus Horizon, I used your EMI calculator: loan ${formatInr(principal)} at ${rate}% for ${years} years, EMI ${formatInr(result.emi)}. I'd like advice on what I can afford. (from /calculators/emi-calculator)`
    : "Hi Nexus Horizon, I'd like advice on my home loan budget. (from /calculators/emi-calculator)";

  return (
    <div className="grid gap-8 rounded-lg border border-mist-strong bg-white p-6 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <div className="space-y-7">
        <NumberField label="Loan amount (₹)" value={principal} onChange={setPrincipal} min={500_000} max={50_000_000} step={100_000} display={formatInrShort(principal)} />
        <NumberField label="Interest rate (% per year)" value={rate} onChange={setRate} min={5} max={15} step={0.05} display={`${rate}%`} />
        <NumberField label="Tenure (years)" value={years} onChange={setYears} min={1} max={30} step={1} display={`${years} years`} />
      </div>
      <div aria-live="polite" className="flex flex-col justify-between rounded-md bg-paper p-6">
        {result ? (
          <>
            <div>
              <p className="text-sm text-slate">Monthly EMI</p>
              <p data-testid="emi-value" className="mt-1 font-display text-4xl tabular-nums text-navy-deep sm:text-5xl">
                {formatInr(result.emi)}
              </p>
            </div>
            <dl className="mt-6 space-y-3 border-t border-mist-strong pt-5 text-[0.95rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-slate">Principal</dt>
                <dd className="tabular-nums">{formatInr(principal)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate">Total interest</dt>
                <dd data-testid="emi-interest" className="tabular-nums">{formatInr(result.totalInterest)}</dd>
              </div>
              <div className="flex justify-between gap-4 font-semibold">
                <dt>Total payable</dt>
                <dd className="tabular-nums">{formatInr(result.totalPayable)}</dd>
              </div>
            </dl>
            <div className="mt-5" aria-hidden="true">
              <div className="flex h-2 overflow-hidden rounded-full bg-mist-strong">
                <div className="bg-navy" style={{ width: `${100 - interestShare}%` }} />
                <div className="bg-gold" style={{ width: `${interestShare}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate">
                <span>Principal {100 - interestShare}%</span>
                <span>Interest {interestShare}%</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-slate">Enter a loan amount, rate and tenure above zero to see your EMI.</p>
        )}
        <a
          href={whatsappHref(siteConfig.whatsapp, message)}
          target="_blank"
          rel="noopener"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-navy px-5 font-semibold text-paper transition-colors hover:bg-navy-deep"
        >
          Talk to an expert
        </a>
      </div>
    </div>
  );
}
