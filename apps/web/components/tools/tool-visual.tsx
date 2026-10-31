import type { ToolVisual as Kind } from "@/lib/content/tools";

const FOREST = "var(--color-forest)";
const SOFT = "var(--color-mist-strong)";
const GOLD = "var(--color-marigold)";

/** Small decorative infographic that signals what each calculator does. */
export function ToolVisual({ kind, className = "" }: { kind: Kind; className?: string }) {
  return (
    <svg viewBox="0 0 160 96" aria-hidden="true" className={`h-24 w-40 ${className}`} fill="none">
      {kind === "donut" && (
        <>
          <circle cx="48" cy="48" r="30" stroke={SOFT} strokeWidth="12" />
          <circle cx="48" cy="48" r="30" stroke={FOREST} strokeWidth="12" strokeDasharray="91 189" transform="rotate(-90 48 48)" />
          <circle cx="48" cy="48" r="30" stroke={GOLD} strokeWidth="12" strokeDasharray="0 91 98 189" transform="rotate(-90 48 48)" />
          <rect x="96" y="30" width="10" height="10" rx="2" fill={FOREST} />
          <rect x="112" y="31" width="38" height="8" rx="4" fill={SOFT} />
          <rect x="96" y="56" width="10" height="10" rx="2" fill={GOLD} />
          <rect x="112" y="57" width="30" height="8" rx="4" fill={SOFT} />
        </>
      )}
      {kind === "bars" &&
        [62, 56, 50, 43, 36, 28, 20, 12].map((h, i) => (
          <g key={i}>
            <rect x={14 + i * 17} y={84 - 70} width="11" height={70 - h} rx="2" fill={GOLD} opacity="0.85" />
            <rect x={14 + i * 17} y={84 - h} width="11" height={h} rx="2" fill={FOREST} />
          </g>
        ))}
      {kind === "gauge" && (
        <>
          <path d="M24 78 A56 56 0 0 1 136 78" stroke={SOFT} strokeWidth="12" strokeLinecap="round" />
          <path d="M24 78 A56 56 0 0 1 116 38" stroke={FOREST} strokeWidth="12" strokeLinecap="round" />
          <line x1="80" y1="78" x2="112" y2="44" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
          <circle cx="80" cy="78" r="6" fill={FOREST} />
        </>
      )}
      {kind === "converge" && (
        <>
          <line x1="12" y1="84" x2="150" y2="84" stroke={SOFT} strokeWidth="2" />
          <path d="M14 22 C60 26 100 44 148 78" stroke={GOLD} strokeWidth="4" strokeLinecap="round" />
          <path d="M14 40 C60 46 100 62 148 80" stroke={FOREST} strokeWidth="4" strokeLinecap="round" />
          <path d="M28 25 L28 42" stroke={FOREST} strokeWidth="2" strokeDasharray="3 3" />
          <path d="M60 30 L60 49" stroke={FOREST} strokeWidth="2" strokeDasharray="3 3" />
          <path d="M92 41 L92 60" stroke={FOREST} strokeWidth="2" strokeDasharray="3 3" />
        </>
      )}
      {kind === "stack" && (
        <>
          <rect x="18" y="58" width="124" height="22" rx="4" fill={FOREST} />
          <rect x="18" y="38" width="124" height="16" rx="4" fill={FOREST} opacity="0.6" />
          <rect x="18" y="22" width="124" height="12" rx="4" fill={FOREST} opacity="0.35" />
          <rect x="18" y="8" width="44" height="10" rx="4" fill={GOLD} />
        </>
      )}
      {kind === "ring" && (
        <>
          <circle cx="48" cy="48" r="32" stroke={SOFT} strokeWidth="10" />
          <circle cx="48" cy="48" r="32" stroke={FOREST} strokeWidth="10" strokeLinecap="round" strokeDasharray="38 201" transform="rotate(-90 48 48)" />
          <text x="48" y="54" textAnchor="middle" fontSize="18" fontWeight="600" fill={FOREST}>%</text>
          <path d="M100 70 L114 54 L126 62 L146 34" stroke={GOLD} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M138 34 L146 34 L146 42" stroke={GOLD} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}
