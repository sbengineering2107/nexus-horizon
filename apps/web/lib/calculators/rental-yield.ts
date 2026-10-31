export type RentalYieldInput = {
  propertyPrice: number;
  monthlyRent: number;
  monthlyMaintenance: number;
  annualPropertyTax: number;
  vacantMonths: number;
};
export type RentalYieldResult = { annualGrossRent: number; annualNetIncome: number; grossYieldPct: number; netYieldPct: number };

const pct2 = (v: number) => Math.round(v * 100) / 100;

/** Gross yield = annual rent ÷ price. Net yield subtracts vacancy, maintenance and property tax. */
export function calculateRentalYield({ propertyPrice, monthlyRent, monthlyMaintenance, annualPropertyTax, vacantMonths }: RentalYieldInput): RentalYieldResult | null {
  if (!(propertyPrice > 0) || !(monthlyRent >= 0) || !(monthlyMaintenance >= 0) || !(annualPropertyTax >= 0) || !(vacantMonths >= 0 && vacantMonths <= 12)) {
    return null;
  }
  const annualGrossRent = monthlyRent * 12;
  const annualNetIncome = Math.round(monthlyRent * (12 - vacantMonths) - monthlyMaintenance * 12 - annualPropertyTax);
  return {
    annualGrossRent,
    annualNetIncome,
    grossYieldPct: pct2((annualGrossRent / propertyPrice) * 100),
    netYieldPct: pct2((annualNetIncome / propertyPrice) * 100),
  };
}
