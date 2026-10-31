export type EmiInput = { principal: number; annualRatePct: number; years: number };
export type EmiResult = { emi: number; totalPayable: number; totalInterest: number; months: number };

/** Unrounded monthly instalment for a reducing-balance loan. Assumes valid input. */
export function rawEmi(principal: number, annualRatePct: number, months: number): number {
  const r = annualRatePct / 12 / 100;
  return r === 0 ? principal / months : (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1);
}

/**
 * Standard reducing-balance EMI: P·r·(1+r)^n / ((1+r)^n − 1), with r the monthly rate.
 * Figures are rounded to the rupee; totals use the unrounded EMI so they match bank schedules closely.
 * Returns null for invalid input (non-positive principal or tenure, negative rate, NaN).
 */
export function calculateEmi({ principal, annualRatePct, years }: EmiInput): EmiResult | null {
  if (!(principal > 0) || !(years > 0) || !(annualRatePct >= 0)) return null;
  const months = Math.round(years * 12);
  const raw = rawEmi(principal, annualRatePct, months);
  const totalPayable = Math.round(raw * months);
  return { emi: Math.round(raw), totalPayable, totalInterest: totalPayable - principal, months };
}
