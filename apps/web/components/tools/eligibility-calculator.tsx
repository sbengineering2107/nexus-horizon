"use client";

import { useState } from "react";
import { calculateEligibility } from "@/lib/calculators/eligibility";
import { formatInr, formatInrShort } from "@/lib/format";
import { NumberField } from "./number-field";
import { CalculatorShell, ResultPanel, ResultRow } from "./result-panel";

export function EligibilityCalculator() {
  const [income, setIncome] = useState(150_000);
  const [existing, setExisting] = useState(10_000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const [foir, setFoir] = useState(50);
  const r = calculateEligibility({ monthlyIncome: income, existingEmis: existing, foirPct: foir, annualRatePct: rate, years });

  const message = r
    ? `Hi Nexus Horizon, my estimated home loan eligibility is ${formatInr(r.maxLoan)} (EMI up to ${formatInr(r.affordableEmi)}). I'd like to see properties in that budget.`
    : "Hi Nexus Horizon, I'd like help with my home loan eligibility.";

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField label="Net monthly income (₹)" value={income} onChange={setIncome} min={20_000} max={1_000_000} step={5_000} display={formatInrShort(income)} />
          <NumberField label="Existing EMIs (₹ per month)" value={existing} onChange={setExisting} min={0} max={300_000} step={1_000} display={formatInr(existing)} />
          <NumberField label="Interest rate (% per year)" value={rate} onChange={setRate} min={5} max={15} step={0.05} display={`${rate}%`} />
          <NumberField label="Tenure (years)" value={years} onChange={setYears} min={1} max={30} step={1} display={`${years} years`} />
          <NumberField label="Share of income for EMIs (%)" value={foir} onChange={setFoir} min={40} max={65} step={1} display={`${foir}%`} />
        </>
      }
      results={
        <ResultPanel message={message}>
          {r ? (
            <>
              <p className="text-sm text-slate">Estimated maximum loan</p>
              <p data-testid="elig-max" className="mt-1 text-4xl font-medium tabular-nums text-navy-deep sm:text-5xl">
                {formatInr(r.maxLoan)}
              </p>
              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[0.95rem]">
                <ResultRow label="EMI you can afford" value={formatInr(r.affordableEmi)} />
                <ResultRow label={`${foir}% of income`} value={formatInr((income * foir) / 100)} />
                <ResultRow label="Less existing EMIs" value={`− ${formatInr(existing)}`} />
              </dl>
              {r.maxLoan === 0 && (
                <p className="mt-4 text-sm text-slate">Your existing EMIs already use the share of income lenders typically allow.</p>
              )}
              <p className="mt-4 text-xs text-slate">An estimate. Lenders also consider age, credit score, employer and the property&rsquo;s value.</p>
            </>
          ) : (
            <p className="text-slate">Enter your income, rate and tenure to estimate eligibility.</p>
          )}
        </ResultPanel>
      }
    />
  );
}
