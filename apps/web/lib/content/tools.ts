export type ToolSlug = "emi-calculator" | "stamp-duty-calculator";

export type Tool = {
  slug: ToolSlug;
  title: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  updated: string;
  faqs: { q: string; a: string }[];
};

export const TOOLS: Tool[] = [
  {
    slug: "emi-calculator",
    title: "Home Loan EMI Calculator",
    short: "Work out your monthly instalment, total interest and total repayment for any loan amount, rate and tenure.",
    seoTitle: "Home Loan EMI Calculator for Pune Buyers",
    seoDescription: "Calculate your home loan EMI, total interest and total repayment instantly. Adjust loan amount, interest rate and tenure to plan your Pune property budget.",
    updated: "2026-10-31",
    faqs: [
      {
        q: "How is a home loan EMI calculated?",
        a: "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of monthly instalments.",
      },
      {
        q: "Does a longer tenure reduce my EMI?",
        a: "Yes. A longer tenure lowers the monthly EMI but increases the total interest you pay over the life of the loan. Compare both numbers before choosing.",
      },
      {
        q: "Is this EMI exactly what my bank will charge?",
        a: "It is a close estimate for a reducing-balance loan. Your bank's figure can differ slightly because of processing fees, rate resets on floating loans and how they round instalments.",
      },
    ],
  },
  {
    slug: "stamp-duty-calculator",
    title: "Stamp Duty Calculator for Pune",
    short: "Estimate Maharashtra stamp duty and registration fees for a property in Pune municipal areas.",
    seoTitle: "Stamp Duty & Registration Calculator for Pune",
    seoDescription: "Estimate stamp duty, metro cess and registration fees for property in Pune (PMC and PCMC areas), including the concession for women buyers.",
    updated: "2026-10-31",
    faqs: [
      {
        q: "What is the stamp duty rate in Pune?",
        a: "In Pune municipal areas the total is 7% of the property value for men or joint buyers: 5% base duty, 1% metro cess and 1% local body tax. A woman buying in her sole name pays 6%.",
      },
      {
        q: "Is stamp duty charged on the agreement value or the ready reckoner value?",
        a: "On whichever is higher. If your agreement value is below the government's ready reckoner value for the property, duty is calculated on the ready reckoner value.",
      },
      {
        q: "How much is the registration fee in Maharashtra?",
        a: "Registration is 1% of the property value, capped at ₹30,000. Properties valued above ₹30 lakh pay the flat ₹30,000.",
      },
      {
        q: "Who qualifies for the women's concession?",
        a: "A woman buying residential property in her sole name. Conditions apply on later transfers, so confirm eligibility with the sub-registrar or IGR Maharashtra before registration.",
      },
    ],
  },
];

export function getTools(): Tool[] {
  return TOOLS;
}

export function getTool(slug: string): Tool | null {
  return TOOLS.find((t) => t.slug === slug) ?? null;
}
