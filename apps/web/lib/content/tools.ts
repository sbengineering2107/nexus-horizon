export type ToolSlug =
  | "emi-calculator"
  | "home-loan-calculator"
  | "loan-eligibility-calculator"
  | "loan-transfer-calculator"
  | "stamp-duty-calculator"
  | "rental-yield-calculator";

/** Which mini infographic represents the tool on cards. */
export type ToolVisual = "donut" | "bars" | "gauge" | "converge" | "stack" | "ring";

export type Tool = {
  slug: ToolSlug;
  title: string;
  short: string;
  seoTitle: string;
  seoDescription: string;
  updated: string;
  visual: ToolVisual;
  /** A worked example shown on the tool card. */
  sample: { label: string; value: string };
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
    visual: "donut",
    sample: { label: "₹50 L at 8.5% for 20 years", value: "₹43,391 / month" },
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
    slug: "home-loan-calculator",
    title: "Home Loan Calculator",
    short: "Plan a purchase from the property price: down payment, loan amount, EMI and a year-by-year repayment schedule.",
    seoTitle: "Home Loan Calculator with Repayment Schedule",
    seoDescription: "Plan your home loan from the property price. See down payment, loan amount, EMI and a yearly principal and interest schedule for Pune purchases.",
    updated: "2026-10-31",
    visual: "bars",
    sample: { label: "₹1 Cr flat, 20% down, 8.5%", value: "₹80 L loan" },
    faqs: [
      {
        q: "How much down payment do I need for a home loan?",
        a: "Lenders in India usually finance 75–90% of the property value depending on the loan size, so plan for a down payment of at least 10–25%, plus stamp duty and registration, which loans generally do not cover.",
      },
      {
        q: "Why is most of my early EMI going to interest?",
        a: "Interest is charged on the outstanding balance, which is highest at the start. As the balance falls, a larger share of each EMI repays principal. The yearly schedule shows this shift.",
      },
      {
        q: "Does a bigger down payment save much interest?",
        a: "Yes. Every rupee you do not borrow avoids interest for the full tenure, so a larger down payment lowers both the EMI and the total interest. Compare scenarios with the calculator.",
      },
    ],
  },
  {
    slug: "loan-eligibility-calculator",
    title: "Home Loan Eligibility Calculator",
    short: "Estimate the largest home loan you could get from your income, existing EMIs, rate and tenure.",
    seoTitle: "Home Loan Eligibility Calculator",
    seoDescription: "Estimate how much home loan you are eligible for based on monthly income, existing EMIs, interest rate and tenure. Plan your Pune property budget.",
    updated: "2026-10-31",
    visual: "gauge",
    sample: { label: "₹1.5 L income, ₹10k EMIs", value: "≈ ₹74.9 L" },
    faqs: [
      {
        q: "How do banks decide home loan eligibility?",
        a: "Mainly on how much of your income can go to EMIs, called FOIR (fixed obligations to income ratio). Many lenders allow 40–60% of net monthly income for all EMIs combined, then check age, credit score, employer and property value.",
      },
      {
        q: "Do existing EMIs reduce my eligibility?",
        a: "Yes. Car, personal and education loan EMIs are subtracted from the share of income available for a home loan EMI, which directly lowers the loan amount you qualify for.",
      },
      {
        q: "Is this eligibility figure guaranteed?",
        a: "No. It is an estimate for planning. Your lender's offer depends on their own FOIR policy, your credit score and the property's valuation.",
      },
    ],
  },
  {
    slug: "loan-transfer-calculator",
    title: "Home Loan Balance Transfer Calculator",
    short: "See whether moving your home loan to a lower rate saves money after transfer charges.",
    seoTitle: "Home Loan Balance Transfer Calculator",
    seoDescription: "Check if a home loan balance transfer is worth it. Compare EMIs and total interest at your current and new rate, after processing and legal charges.",
    updated: "2026-10-31",
    visual: "converge",
    sample: { label: "₹40 L, 9.5% → 8.5%, 15 years", value: "Saves ≈ ₹4 L" },
    faqs: [
      {
        q: "When is a home loan balance transfer worth it?",
        a: "Usually when the rate difference is meaningful and plenty of tenure remains. Savings come from lower interest on the outstanding balance, so they shrink as the loan nears its end.",
      },
      {
        q: "What charges apply when transferring a home loan?",
        a: "Typically the new lender's processing fee, legal and valuation charges, and stamp duty on the new mortgage documents. Enter your total expected charges to see the net saving.",
      },
      {
        q: "Should I ask my current bank first?",
        a: "Yes. Many banks reduce your rate for a small conversion fee if you ask, which can capture most of the saving without moving the loan.",
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
    visual: "stack",
    sample: { label: "₹80 L flat, man or joint buyer", value: "₹5,90,000" },
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
  {
    slug: "rental-yield-calculator",
    title: "Rental Yield Calculator",
    short: "Work out the gross and net rental yield of a property after maintenance, property tax and vacancy.",
    seoTitle: "Rental Yield Calculator for Pune Property",
    seoDescription: "Calculate gross and net rental yield for a Pune flat or office. Include maintenance, property tax and vacant months to see your real annual return.",
    updated: "2026-10-31",
    visual: "ring",
    sample: { label: "₹80 L flat, ₹25k rent", value: "3.75% gross" },
    faqs: [
      {
        q: "What is the difference between gross and net rental yield?",
        a: "Gross yield is annual rent divided by the property price. Net yield first subtracts running costs such as maintenance, property tax and months the property sits empty, so it reflects what you actually earn.",
      },
      {
        q: "What is a good rental yield in Pune?",
        a: "Residential yields in Indian cities are typically modest, often in the low single digits, while commercial property generally yields more. Compare options on net yield and expected appreciation together.",
      },
      {
        q: "Does rental yield include price appreciation?",
        a: "No. Yield measures income only. Your total return is rental yield plus any increase in the property's value, minus purchase costs such as stamp duty.",
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
