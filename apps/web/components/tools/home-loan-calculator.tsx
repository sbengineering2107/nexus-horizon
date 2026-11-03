"use client";

import { useState } from "react";
import { planHomeLoan } from "@/lib/calculators/loan-planner";
import { formatInr, formatInrShort } from "@/lib/format";
import { NumberField } from "./number-field";
import { CalculatorShell, ResultPanel, ResultRow } from "./result-panel";

export function HomeLoanCalculator() {
  const [price, setPrice] = useState(10_000_000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const plan = planHomeLoan({ propertyPrice: price, downPaymentPct: down, annualRatePct: rate, years });
  const maxYear = plan ? Math.max(...plan.schedule.map((y) => y.interest + y.principal)) : 1;

  const message = plan
    ? `Hi Nexus Horizon, I'm planning a ${formatInr(price)} property with ${down}% down: loan ${formatInr(plan.loanAmount)}, EMI ${formatInr(plan.emi)}. I'd like advice.`
    : "Hi Nexus Horizon, I'd like help planning my home loan.";

  return (
    <div className="space-y-8">
      <CalculatorShell
        inputs={
          <>
            <NumberField label="Property price (₹)" value={price} onChange={setPrice} min={1_000_000} max={50_000_000} step={100_000} display={formatInrShort(price)} />
            <NumberField label="Down payment (%)" value={down} onChange={setDown} min={0} max={90} step={1} display={plan ? formatInrShort(plan.downPayment) : undefined} />
            <NumberField label="Interest rate (% per year)" value={rate} onChange={setRate} min={5} max={15} step={0.05} display={`${rate}%`} />
            <NumberField label="Tenure (years)" value={years} onChange={setYears} min={1} max={30} step={1} display={`${years} years`} />
          </>
        }
        results={
          <ResultPanel message={message}>
            {plan ? (
              <>
                <p className="text-sm text-slate">Monthly EMI</p>
                <p data-testid="plan-emi" className="mt-1 text-4xl font-medium tabular-nums text-navy-deep sm:text-5xl">
                  {formatInr(plan.emi)}
                </p>
                <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[0.95rem]">
                  <ResultRow label="Down payment" value={formatInr(plan.downPayment)} />
                  <ResultRow label="Loan amount" value={formatInr(plan.loanAmount)} testId="plan-loan" />
                  <ResultRow label="Total interest" value={formatInr(plan.totalInterest)} />
                  <ResultRow label="Total cost of the loan" value={formatInr(plan.loanAmount + plan.totalInterest)} strong />
                </dl>
              </>
            ) : (
              <p className="text-slate">Enter a price, a down payment below 100% and a tenure to see your plan.</p>
            )}
          </ResultPanel>
        }
      />
      {plan && (
        <section aria-labelledby="schedule-heading" className="rounded-lg border border-line bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="schedule-heading" className="text-2xl">
              Year-by-year repayment
            </h2>
            <div className="flex gap-5 text-sm text-slate">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-navy" /> Principal
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-gold" /> Interest
              </span>
            </div>
          </div>
          <div aria-hidden="true" className="mt-6 flex h-40 items-end gap-1">
            {plan.schedule.map((y) => (
              <div key={y.year} className="flex h-full flex-1 flex-col justify-end" title={`Year ${y.year}`}>
                <div className="rounded-t-sm bg-gold" style={{ height: `${(y.interest / maxYear) * 100}%` }} />
                <div className="bg-navy" style={{ height: `${(y.principal / maxYear) * 100}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-8 max-h-96 overflow-auto">
            <table className="w-full min-w-[30rem] border-collapse text-left text-[0.95rem] tabular-nums">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-line text-slate">
                  <th className="py-2 pr-4 font-semibold">Year</th>
                  <th className="py-2 pr-4 font-semibold">Principal</th>
                  <th className="py-2 pr-4 font-semibold">Interest</th>
                  <th className="py-2 font-semibold">Balance</th>
                </tr>
              </thead>
              <tbody>
                {plan.schedule.map((y) => (
                  <tr key={y.year} data-testid="schedule-row" className="border-b border-line">
                    <td className="py-2 pr-4">{y.year}</td>
                    <td className="py-2 pr-4">{formatInr(y.principal)}</td>
                    <td className="py-2 pr-4">{formatInr(y.interest)}</td>
                    <td className="py-2">{formatInr(y.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
