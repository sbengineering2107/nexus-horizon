"use client";

import { useState } from "react";
import { compareLoanTransfer } from "@/lib/calculators/loan-transfer";
import { formatInr, formatInrShort } from "@/lib/format";
import { NumberField } from "./number-field";
import { CalculatorShell, ResultPanel, ResultRow } from "./result-panel";

export function LoanTransferCalculator() {
  const [outstanding, setOutstanding] = useState(4_000_000);
  const [current, setCurrent] = useState(9.5);
  const [next, setNext] = useState(8.5);
  const [years, setYears] = useState(15);
  const [charges, setCharges] = useState(25_000);
  const r = compareLoanTransfer({ outstanding, currentRatePct: current, newRatePct: next, yearsLeft: years, transferCharges: charges });

  const message = r
    ? `Hi Nexus Horizon, I'm considering moving my ${formatInr(outstanding)} home loan from ${current}% to ${next}%: estimated net saving ${formatInr(r.netSaving)}. Can you help? (from /calculators/loan-transfer-calculator)`
    : "Hi Nexus Horizon, I'd like advice on a home loan balance transfer. (from /calculators/loan-transfer-calculator)";

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField label="Outstanding loan (₹)" value={outstanding} onChange={setOutstanding} min={500_000} max={30_000_000} step={100_000} display={formatInrShort(outstanding)} />
          <NumberField label="Current rate (%)" value={current} onChange={setCurrent} min={5} max={15} step={0.05} display={`${current}%`} />
          <NumberField label="New rate offered (%)" value={next} onChange={setNext} min={5} max={15} step={0.05} display={`${next}%`} />
          <NumberField label="Years remaining" value={years} onChange={setYears} min={1} max={30} step={1} display={`${years} years`} />
          <NumberField label="Transfer charges (₹)" value={charges} onChange={setCharges} min={0} max={200_000} step={1_000} display={formatInr(charges)} />
        </>
      }
      results={
        <ResultPanel message={message}>
          {r ? (
            <>
              <p className="text-sm text-slate">Net saving after charges</p>
              <p
                data-testid="transfer-net"
                className={`mt-1 text-4xl font-medium tabular-nums sm:text-5xl ${r.worthIt ? "text-navy-deep" : "text-basalt"}`}
              >
                {formatInr(r.netSaving)}
              </p>
              <p
                data-testid="transfer-verdict"
                className={`mt-3 inline-block rounded-full px-3 py-1 text-sm font-semibold ${r.worthIt ? "bg-navy/10 text-navy-deep" : "bg-gold/20 text-basalt"}`}
              >
                {r.worthIt ? "Likely worth transferring" : "Probably not worth transferring"}
              </p>
              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[0.95rem]">
                <ResultRow label="Current EMI" value={formatInr(r.currentEmi)} />
                <ResultRow label="New EMI" value={formatInr(r.newEmi)} />
                <ResultRow label="Interest saved" value={formatInr(r.interestSaved)} />
                <ResultRow label="Less transfer charges" value={`− ${formatInr(charges)}`} />
              </dl>
            </>
          ) : (
            <p className="text-slate">Enter the outstanding amount, both rates and the years remaining.</p>
          )}
        </ResultPanel>
      }
    />
  );
}
