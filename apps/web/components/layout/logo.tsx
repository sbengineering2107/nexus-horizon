/** Wordmark with a ridge-on-the-horizon mark. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const ink = tone === "dark" ? "text-forest-deep" : "text-paper";
  return (
    <span className={`inline-flex items-center gap-2.5 ${ink}`}>
      <svg viewBox="0 0 40 24" aria-hidden="true" className="h-6 w-10 shrink-0">
        <path
          d="M1 20 L9 11 L14 15 L22 6 L29 13 L33 10 L39 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <line x1="1" y1="22.5" x2="39" y2="22.5" stroke="var(--color-marigold)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="font-display text-lg leading-none font-semibold tracking-tight">
        Nexus Horizon
        <span className="block text-[0.7rem] font-normal tracking-normal opacity-80">Advisors</span>
      </span>
    </span>
  );
}
