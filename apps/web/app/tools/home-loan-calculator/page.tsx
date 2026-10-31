import type { Metadata } from "next";
import { getTool } from "@/lib/content/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPage } from "@/components/tools/tool-page";
import { HomeLoanCalculator } from "@/components/tools/home-loan-calculator";

const tool = getTool("home-loan-calculator")!;

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
          <h2>How to use the plan</h2>
          <p>
            Start from the price of the home you are considering. The down payment you choose sets the loan amount, and
            the schedule shows how each year&rsquo;s instalments split between interest and principal.
          </p>
          <p>
            In the early years most of each EMI is interest. Prepaying even small amounts in those years cuts the total
            interest noticeably, because it reduces the balance that interest is charged on.
          </p>
          <h2>Budget for costs beyond the loan</h2>
          <p>
            Stamp duty, registration and any interiors are usually paid from your own funds. Use the stamp duty
            calculator alongside this plan to see the full amount you need on the day of registration.
          </p>
        </>
      }
    >
      <HomeLoanCalculator />
    </ToolPage>
  );
}
