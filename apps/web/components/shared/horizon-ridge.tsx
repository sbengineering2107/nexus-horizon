/**
 * The site's signature: a Sahyadri ridge line on the horizon.
 * Draws in once on load; static when reduced motion is preferred.
 */
export function HorizonRidge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-24 w-full sm:h-32 ${className}`}
    >
      <path
        className="ridge-far"
        d="M0 112 L90 84 L170 98 L280 52 L360 76 L440 60 L560 92 L650 70 L760 96 L860 58 L960 82 L1060 66 L1200 100"
        fill="none"
        stroke="var(--color-mist-strong)"
        strokeWidth="2"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="ridge-near"
        d="M0 128 L120 90 L210 112 L330 40 L420 84 L500 70 L620 118 L720 86 L820 104 L940 36 L1040 92 L1120 80 L1200 120"
        fill="none"
        stroke="var(--color-forest)"
        strokeWidth="3"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <line x1="0" y1="136" x2="1200" y2="136" stroke="var(--color-marigold)" strokeWidth="4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
