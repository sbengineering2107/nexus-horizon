import type { Metadata } from "next";
import { getTool } from "@/lib/content/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPage } from "@/components/tools/tool-page";
import { EmiCalculator } from "@/components/tools/emi-calculator";

const tool = getTool("emi-calculator")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/calculators/${tool.slug}`,
});

export default function EmiCalculatorPage() {
  return (
    <ToolPage
      tool={tool}
      explainer={
        <>
          <h2>How your EMI is worked out</h2>
          <p>
            An EMI (equated monthly instalment) repays a home loan in equal monthly amounts. Each payment covers that
            month&rsquo;s interest first, and the rest reduces the principal, so early instalments are mostly interest.
          </p>
          <p>
            The formula is <strong>EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</strong>, where P is the loan amount, r is
            the monthly rate (annual rate ÷ 12 ÷ 100) and n is the number of months.
          </p>
          <h2>Plan the full cost, not just the EMI</h2>
          <p>
            Banks typically lend up to 75–90% of the property value, so budget for the down payment, plus stamp duty and
            registration, which are not usually covered by the loan.
          </p>
        </>
      }
    >
      <EmiCalculator />
    </ToolPage>
  );
}
