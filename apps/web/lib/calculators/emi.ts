export type EmiInput = { principal: number; annualRatePct: number; years: number };
export type EmiResult = { emi: number; totalPayable: number; totalInterest: number; months: number };

/**
 * Standard reducing-balance EMI: P·r·(1+r)^n / ((1+r)^n − 1), with r the monthly rate.
 * Figures are rounded to the rupee; totals use the unrounded EMI so they match bank schedules closely.
 * Returns null for invalid input (non-positive principal or tenure, negative rate, NaN).
 */
export function calculateEmi({ principal, annualRatePct, years }: EmiInput): EmiResult | null {
  if (!(principal > 0) || !(years > 0) || !(annualRatePct >= 0)) return null;
  const months = Math.round(years * 12);
  const r = annualRatePct / 12 / 100;
  const raw = r === 0 ? principal / months : (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1);
  const totalPayable = Math.round(raw * months);
  return { emi: Math.round(raw), totalPayable, totalInterest: totalPayable - principal, months };
}
