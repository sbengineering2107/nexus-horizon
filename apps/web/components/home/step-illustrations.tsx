/**
 * Spot illustrations for "How it works". Each one draws what its step says:
 * brief = the four things we ask; shortlist = options with pros and cons;
 * visit = one planned route through the shortlist; close = signed, verified, keys.
 */

const FOREST = "var(--color-forest)";
const MIST = "var(--color-mist)";
const LINE = "var(--color-mist-strong)";
const GOLD = "var(--color-marigold)";

export type StepKind = "brief" | "shortlist" | "visit" | "close";

function Pin({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <g>
      <path d={`M${x} ${y}c-4.5-5-6.5-8-6.5-10.5a6.5 6.5 0 0 1 13 0c0 2.5-2 5.5-6.5 10.5z`} fill={fill} />
      <circle cx={x} cy={y - 10.5} r={2.4} fill="#fff" />
    </g>
  );
}

function Brief() {
  const rows = [28, 42, 56, 70];
  const ends = [78, 72, 80, 70];
  return (
    <>
      <rect x="34" y="10" width="52" height="72" rx="6" fill="#fff" stroke={FOREST} strokeWidth="2" />
      <rect x="48" y="5" width="24" height="10" rx="3" fill={FOREST} />
      {rows.map((y, i) => (
        <g key={y}>
          <circle cx="46" cy={y} r="5.5" fill={MIST} />
          <line x1="56" x2={ends[i]} y1={y} y2={y} stroke={LINE} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      {/* budget */}
      <text x="46" y="31" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={FOREST}>
        ₹
      </text>
      {/* area */}
      <path d="M46 46.5c-2.6-2.9-3.8-4.6-3.8-6.1a3.8 3.8 0 0 1 7.6 0c0 1.5-1.2 3.2-3.8 6.1z" fill={FOREST} />
      {/* configuration */}
      <path d="M41.8 57 46 53.2 50.2 57v3.3h-8.4z" fill={FOREST} />
      {/* move-in date */}
      <rect x="42.3" y="66.3" width="7.4" height="7.4" rx="1.4" fill="none" stroke={FOREST} strokeWidth="1.4" />
      <line x1="42.3" x2="49.7" y1="69" y2="69" stroke={FOREST} strokeWidth="1.4" />
      {/* pencil */}
      <line x1="100" y1="16" x2="87" y2="38" stroke={GOLD} strokeWidth="5" strokeLinecap="round" />
      <line x1="87" y1="38" x2="85" y2="42" stroke={FOREST} strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function Shortlist() {
  const cards = [
    { x: 8, y: 16, best: false },
    { x: 44, y: 9, best: true },
    { x: 80, y: 16, best: false },
  ];
  return (
    <>
      {cards.map((c) => (
        <g key={c.x}>
          <rect x={c.x} y={c.y} width="32" height="62" rx="5" fill="#fff" stroke={c.best ? FOREST : LINE} strokeWidth={c.best ? 2 : 1.5} />
          <rect x={c.x + 9} y={c.y + 9} width="14" height="20" rx="1.5" fill={MIST} stroke={FOREST} strokeWidth="1.2" />
          <line x1={c.x + 13} x2={c.x + 19} y1={c.y + 15} y2={c.y + 15} stroke={FOREST} strokeWidth="1.2" />
          <line x1={c.x + 13} x2={c.x + 19} y1={c.y + 21} y2={c.y + 21} stroke={FOREST} strokeWidth="1.2" />
          {/* pro */}
          <circle cx={c.x + 9} cy={c.y + 40} r="4" fill={FOREST} />
          <path d={`M${c.x + 7} ${c.y + 40}l1.5 1.5 3-3`} stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={c.x + 16} x2={c.x + 26} y1={c.y + 40} y2={c.y + 40} stroke={LINE} strokeWidth="2.5" strokeLinecap="round" />
          {/* con */}
          <circle cx={c.x + 9} cy={c.y + 51} r="4" fill={GOLD} />
          <line x1={c.x + 7} x2={c.x + 11} y1={c.y + 51} y2={c.y + 51} stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
          <line x1={c.x + 16} x2={c.x + 24} y1={c.y + 51} y2={c.y + 51} stroke={LINE} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      {/* best fit */}
      <circle cx="74" cy="10" r="7" fill={GOLD} />
      <path d="M74 6.2l1.1 2.3 2.5.3-1.8 1.7.5 2.5-2.3-1.2-2.3 1.2.5-2.5-1.8-1.7 2.5-.3z" fill="#fff" />
    </>
  );
}

function Visit() {
  return (
    <>
      <rect x="6" y="8" width="108" height="74" rx="8" fill={MIST} />
      <line x1="6" x2="114" y1="56" y2="56" stroke="#fff" strokeWidth="4" />
      <line x1="40" x2="40" y1="8" y2="82" stroke="#fff" strokeWidth="4" />
      <line x1="76" x2="76" y1="56" y2="82" stroke="#fff" strokeWidth="4" />
      {/* one planned route through the shortlist */}
      <path
        d="M24 68C36 66 36 42 48 40S70 56 82 52 96 30 100 28"
        stroke={FOREST}
        strokeWidth="2"
        strokeDasharray="4 3"
        fill="none"
        strokeLinecap="round"
      />
      <Pin x={48} y={40} fill={FOREST} />
      <Pin x={82} y={52} fill={FOREST} />
      <Pin x={100} y={28} fill={FOREST} />
      {/* car at the start */}
      <path d="M13 66l2.5-4h7.5l2.5 4z" fill={GOLD} />
      <rect x="11" y="65.5" width="17" height="7" rx="2.5" fill={GOLD} />
      <circle cx="15.5" cy="73" r="2" fill={FOREST} />
      <circle cx="23.5" cy="73" r="2" fill={FOREST} />
      {/* in one day */}
      <circle cx="22" cy="24" r="8" fill="#fff" stroke={GOLD} strokeWidth="2" />
      <line x1="22" y1="24" x2="22" y2="19.5" stroke={FOREST} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="22" y1="24" x2="25.5" y2="25.5" stroke={FOREST} strokeWidth="1.6" strokeLinecap="round" />
    </>
  );
}

function Close() {
  return (
    <>
      <rect x="18" y="8" width="56" height="74" rx="5" fill="#fff" stroke={FOREST} strokeWidth="1.8" />
      {[22, 30, 38, 46].map((y, i) => (
        <line key={y} x1="28" x2={[64, 58, 62, 50][i]} y1={y} y2={y} stroke={LINE} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      {/* signature */}
      <path d="M28 64c3-6 6-6 7 0s4 3 7-2 4-4 5 1 4 2 7-2" stroke={FOREST} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <line x1="28" x2="58" y1="70" y2="70" stroke={LINE} strokeWidth="1.2" />
      {/* verified seal */}
      <circle cx="68" cy="68" r="11" fill={FOREST} />
      <path d="M62.5 68l3.5 3.5 7-7" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* keys */}
      <circle cx="98" cy="26" r="8" fill="none" stroke={GOLD} strokeWidth="3.5" />
      <line x1="98" y1="34" x2="98" y2="68" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="98" y1="58" x2="104" y2="58" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="98" y1="65" x2="103" y2="65" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round" />
    </>
  );
}

const DRAW: Record<StepKind, () => React.ReactNode> = {
  brief: Brief,
  shortlist: Shortlist,
  visit: Visit,
  close: Close,
};

export function StepIllustration({ kind, className = "" }: { kind: StepKind; className?: string }) {
  const Draw = DRAW[kind];
  return (
    <svg viewBox="0 0 120 90" aria-hidden="true" data-illustration={kind} className={className} fill="none">
      <Draw />
    </svg>
  );
}
