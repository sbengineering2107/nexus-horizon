import Link from "next/link";
import type { Tool } from "@/lib/content/tools";
import { ToolVisual } from "./tool-visual";

export function ToolCard({ tool, headingLevel = "h3" }: { tool: Tool; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/calculators/${tool.slug}`}
      data-testid="tool-card"
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-forest/50"
    >
      <div className="flex items-center justify-center bg-mist/60 py-6 transition-colors group-hover:bg-mist">
        <ToolVisual kind={tool.visual} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-forest">{tool.question}</p>
        <Heading className="mt-1 text-xl group-hover:text-forest">{tool.title}</Heading>
        <p className="mt-2 flex-1 text-[0.95rem] text-slate">{tool.short}</p>
        <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
          <div>
            <p className="text-xs text-slate">{tool.sample.label}</p>
            <p className="mt-0.5 font-semibold tabular-nums text-forest-deep">{tool.sample.value}</p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-forest group-hover:underline">Open</span>
        </div>
      </div>
    </Link>
  );
}
