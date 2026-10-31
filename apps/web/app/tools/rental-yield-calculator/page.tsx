import type { Metadata } from "next";
import { getTool } from "@/lib/content/tools";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPage } from "@/components/tools/tool-page";
import { RentalYieldCalculator } from "@/components/tools/rental-yield-calculator";

const tool = getTool("rental-yield-calculator")!;

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
          <h2>Gross versus net yield</h2>
          <p>
            Gross yield is the annual rent divided by the property price. It is useful for quick comparison but
            overstates what you earn.
          </p>
          <p>
            Net yield subtracts maintenance, property tax and the rent lost while the property is empty. Compare
            properties on net yield, and consider expected price appreciation separately.
          </p>
        </>
      }
    >
      <RentalYieldCalculator />
    </ToolPage>
  );
}
