import type { Metadata } from "next";
import { getTool } from "@/lib/content/tools";
import { PUNE_RATES } from "@/lib/calculators/stamp-duty";
import { buildMetadata } from "@/lib/seo/metadata";
import { ToolPage } from "@/components/tools/tool-page";
import { StampDutyCalculator } from "@/components/tools/stamp-duty-calculator";

const tool = getTool("stamp-duty-calculator")!;

export const metadata: Metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: `/calculators/${tool.slug}`,
});

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function StampDutyCalculatorPage() {
  const man = PUNE_RATES.duty["man-or-joint"];
  const woman = PUNE_RATES.duty["woman-sole"];
  return (
    <ToolPage
      tool={tool}
      explainer={
        <>
          <h2>Stamp duty rates in Pune</h2>
          <p>
            For property in Pune municipal areas (PMC and PCMC), stamp duty is charged on the higher of the agreement
            value and the ready reckoner value, and registration is 1% of that value up to ₹30,000.
          </p>
          <div className="my-6 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-[0.95rem]">
              <thead>
                <tr className="border-b border-mist-strong text-slate">
                  <th className="py-2 pr-4 font-semibold">Component</th>
                  <th className="py-2 pr-4 font-semibold">Man or joint</th>
                  <th className="py-2 font-semibold">Woman, sole owner</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                <tr className="border-b border-mist-strong">
                  <td className="py-2 pr-4">Base stamp duty</td>
                  <td className="py-2 pr-4">{man.base}%</td>
                  <td className="py-2">{woman.base}%</td>
                </tr>
                <tr className="border-b border-mist-strong">
                  <td className="py-2 pr-4">Metro cess</td>
                  <td className="py-2 pr-4">{man.metroCess}%</td>
                  <td className="py-2">{woman.metroCess}%</td>
                </tr>
                <tr className="border-b border-mist-strong">
                  <td className="py-2 pr-4">Local body tax</td>
                  <td className="py-2 pr-4">{man.localBodyTax}%</td>
                  <td className="py-2">{woman.localBodyTax}%</td>
                </tr>
                <tr className="border-b border-mist-strong font-semibold">
                  <td className="py-2 pr-4">Total stamp duty</td>
                  <td className="py-2 pr-4">{man.base + man.metroCess + man.localBodyTax}%</td>
                  <td className="py-2">{woman.base + woman.metroCess + woman.localBodyTax}%</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Registration fee</td>
                  <td className="py-2 pr-4" colSpan={2}>
                    1%, maximum ₹30,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <em>
              These are estimates for planning. Rates change by government notification, and outside municipal limits
              they differ. Confirm the final amount with the sub-registrar or{" "}
              <a href={PUNE_RATES.official} className="text-forest underline" rel="noopener" target="_blank">
                IGR Maharashtra
              </a>{" "}
              before registration.
            </em>
          </p>
          <p className="text-sm text-slate">
            Last verified {dateFmt.format(new Date(PUNE_RATES.lastVerified))} against{" "}
            {PUNE_RATES.sources.map((s, i) => (
              <span key={s}>
                {i > 0 && " and "}
                <a href={s} className="underline" rel="noopener" target="_blank">
                  {new URL(s).hostname.replace("www.", "")}
                </a>
              </span>
            ))}
            .
          </p>
        </>
      }
    >
      <StampDutyCalculator />
    </ToolPage>
  );
}
