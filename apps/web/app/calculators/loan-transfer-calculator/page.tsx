import type { Metadata } from "next";
import { getTool } from "@/lib/content/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPage } from "@/components/tools/tool-page";
import { LoanTransferCalculator } from "@/components/tools/loan-transfer-calculator";

const tool = getTool("loan-transfer-calculator")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/calculators/${tool.slug}`,
});

export default function Page() {
  return (
    <ToolPage
      tool={tool}
      explainer={
        <>
          <h2>How the saving is worked out</h2>
          <p>
            The calculator compares the EMI on your outstanding balance at your current rate with the EMI at the new
            rate, over the same remaining tenure. The difference across all remaining months is the interest saved.
          </p>
          <p>
            Transfer charges are then subtracted to give the net saving. If that figure is small or negative, it is
            usually better to ask your current lender for a lower rate instead.
          </p>
        </>
      }
    >
      <LoanTransferCalculator />
    </ToolPage>
  );
}
