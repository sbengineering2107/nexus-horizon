import type { Metadata } from "next";
import { getTool } from "@/lib/content/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPage } from "@/components/tools/tool-page";
import { EligibilityCalculator } from "@/components/tools/eligibility-calculator";

const tool = getTool("loan-eligibility-calculator")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/tools/${tool.slug}`,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      explainer={
        <>
          <h2>How eligibility is estimated</h2>
          <p>
            Lenders cap the share of your monthly income that can go to all EMIs combined. This is called the FOIR
            (fixed obligations to income ratio) and commonly ranges from 40% to 60%, depending on income and lender.
          </p>
          <p>
            The calculator takes that share of your income, subtracts your existing EMIs, and works out the largest loan
            that the remaining amount can repay at your chosen rate and tenure.
          </p>
          <h2>Ways to improve eligibility</h2>
          <p>
            Closing small loans, adding a co-applicant&rsquo;s income, choosing a longer tenure or maintaining a strong
            credit score can all raise the amount a lender will offer.
          </p>
        </>
      }
    >
      <EligibilityCalculator />
    </ToolPage>
  );
}
