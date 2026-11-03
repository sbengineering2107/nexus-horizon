"use client";

import { useState } from "react";
import { calculateRentalYield } from "@/lib/calculators/rental-yield";
import { formatInr, formatInrShort } from "@/lib/format";
import { NumberField } from "./number-field";
import { CalculatorShell, ResultPanel, ResultRow } from "./result-panel";

export function RentalYieldCalculator() {
  const [price, setPrice] = useState(8_000_000);
  const [rent, setRent] = useState(25_000);
  const [maint, setMaint] = useState(3_000);
  const [tax, setTax] = useState(12_000);
  const [vacant, setVacant] = useState(1);
  const r = calculateRentalYield({ propertyPrice: price, monthlyRent: rent, monthlyMaintenance: maint, annualPropertyTax: tax, vacantMonths: vacant });

  const message = r
    ? `Hi Nexus Horizon, I'm comparing a ${formatInr(price)} property at ${formatInr(rent)}/month rent: ${r.grossYieldPct}% gross, ${r.netYieldPct}% net yield. I'd like investment advice.`
    : "Hi Nexus Horizon, I'd like advice on rental investment.";

  return (
    <CalculatorShell
      inputs={
        <>
          <NumberField label="Property price (₹)" value={price} onChange={setPrice} min={1_000_000} max={50_000_000} step={100_000} display={formatInrShort(price)} />
          <NumberField label="Monthly rent (₹)" value={rent} onChange={setRent} min={5_000} max={500_000} step={1_000} display={formatInr(rent)} />
          <NumberField label="Monthly maintenance (₹)" value={maint} onChange={setMaint} min={0} max={50_000} step={500} display={formatInr(maint)} />
          <NumberField label="Property tax (₹ per year)" value={tax} onChange={setTax} min={0} max={200_000} step={1_000} display={formatInr(tax)} />
          <NumberField label="Vacant months per year" value={vacant} onChange={setVacant} min={0} max={12} step={1} display={`${vacant} months`} />
        </>
      }
      results={
        <ResultPanel message={message}>
          {r ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate">Gross yield</p>
                  <p data-testid="yield-gross" className="mt-1 text-4xl font-medium tabular-nums text-navy-deep">
                    {r.grossYieldPct}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate">Net yield</p>
                  <p data-testid="yield-net" className="mt-1 text-4xl font-medium tabular-nums text-navy-deep">
                    {r.netYieldPct}%
                  </p>
                </div>
              </div>
              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-[0.95rem]">
                <ResultRow label="Annual rent (fully let)" value={formatInr(r.annualGrossRent)} />
                <ResultRow label="Lost to vacancy" value={`− ${formatInr(rent * vacant)}`} />
                <ResultRow label="Maintenance and tax" value={`− ${formatInr(maint * 12 + tax)}`} />
                <ResultRow label="Net annual income" value={formatInr(r.annualNetIncome)} strong />
              </dl>
            </>
          ) : (
            <p className="text-slate">Enter a price and rent, with vacant months between 0 and 12.</p>
          )}
        </ResultPanel>
      }
    />
  );
}
