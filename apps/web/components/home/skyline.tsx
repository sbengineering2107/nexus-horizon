/**
 * Line-art skyline under the hero. On scroll, buildings rise from the ground one after another,
 * floor lines fade in, and the crane jib swings into place over the tower under construction.
 * All motion is CSS (see globals.css, "Skyline"); without support it renders as a finished skyline.
 */

type Kind = "residential" | "office" | "lowrise" | "construction";
type Building = { x: number; w: number; h: number; kind: Kind };

const GROUND = 150;

const BUILDINGS: Building[] = [
  { x: 30, w: 86, h: 72, kind: "residential" },
  { x: 128, w: 64, h: 112, kind: "residential" },
  { x: 206, w: 108, h: 50, kind: "lowrise" },
  { x: 330, w: 78, h: 128, kind: "construction" },
  { x: 560, w: 118, h: 88, kind: "office" },
  { x: 694, w: 70, h: 122, kind: "residential" },
  { x: 778, w: 100, h: 58, kind: "lowrise" },
  { x: 894, w: 82, h: 100, kind: "office" },
  { x: 992, w: 66, h: 134, kind: "residential" },
  { x: 1072, w: 98, h: 64, kind: "residential" },
];

function Details({ b }: { b: Building }) {
  const top = GROUND - b.h;
  const lines: React.ReactNode[] = [];
  if (b.kind === "office") {
    for (let y = top + 12; y < GROUND - 8; y += 14) {
      for (let x = b.x + 10; x < b.x + b.w - 14; x += 16) {
        lines.push(<rect key={`${x}-${y}`} x={x} y={y} width={8} height={7} rx={1} />);
      }
    }
  } else if (b.kind === "construction") {
    // Finished lower floors, open frame above.
    const finished = top + b.h * 0.42;
    for (let y = finished + 10; y < GROUND - 6; y += 12) lines.push(<line key={y} x1={b.x + 8} x2={b.x + b.w - 8} y1={y} y2={y} />);
    for (let y = top + 10; y < finished; y += 12) lines.push(<line key={`f${y}`} className="frame" x1={b.x} x2={b.x + b.w} y1={y} y2={y} />);
    lines.push(<line key="c1" className="frame" x1={b.x + b.w / 2} x2={b.x + b.w / 2} y1={top} y2={finished} />);
  } else {
    const step = b.kind === "lowrise" ? 14 : 12;
    for (let y = top + 10; y < GROUND - 6; y += step) {
      lines.push(<line key={y} x1={b.x + 8} x2={b.x + b.w * 0.42} y1={y} y2={y} />);
      lines.push(<line key={`r${y}`} x1={b.x + b.w * 0.58} x2={b.x + b.w - 8} y1={y} y2={y} />);
    }
  }
  return <g className="bldg-detail">{lines}</g>;
}

export function Skyline({ className = "" }: { className?: string }) {
  const crane = BUILDINGS.find((b) => b.kind === "construction")!;
  const mastX = crane.x + crane.w + 22;
  const jibY = GROUND - crane.h - 12;
  return (
    <svg
      viewBox="0 0 1200 156"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      data-fx="skyline"
      className={`skyline block h-auto w-full ${className}`}
    >
      <g fill="#fff" stroke="var(--color-forest)" strokeWidth="1.5" strokeLinejoin="round">
        {BUILDINGS.map((b, i) => (
          <g key={b.x} className="bldg" style={{ "--i": i } as React.CSSProperties}>
            <rect x={b.x} y={GROUND - b.h} width={b.w} height={b.h} />
            <g stroke="var(--color-forest)" strokeWidth="1" opacity="0.55" fill="none">
              <Details b={b} />
            </g>
          </g>
        ))}
      </g>
      {/* Tower crane beside the building under construction */}
      <g className="crane" stroke="var(--color-marigold-deep)" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <line x1={mastX} x2={mastX} y1={GROUND} y2={jibY - 10} />
        <line x1={mastX - 4} x2={mastX + 4} y1={GROUND} y2={GROUND} />
        <g className="crane-jib" style={{ transformOrigin: `${mastX}px ${jibY}px` }}>
          {/* Long jib reaches back over the tower; short counter-jib on the other side. */}
          <line x1={mastX - 110} x2={mastX + 28} y1={jibY} y2={jibY} />
          <line x1={mastX} x2={mastX - 70} y1={jibY - 10} y2={jibY} />
          <line x1={mastX} x2={mastX + 28} y1={jibY - 10} y2={jibY} />
          <rect x={mastX + 16} y={jibY + 1} width={12} height={6} fill="var(--color-marigold-deep)" stroke="none" />
          <line x1={mastX - 78} x2={mastX - 78} y1={jibY} y2={jibY + 22} />
          <rect x={mastX - 83} y={jibY + 22} width={10} height={6} fill="var(--color-marigold)" stroke="none" />
        </g>
      </g>
      <line x1="0" x2="1200" y1={GROUND + 2} y2={GROUND + 2} stroke="var(--color-marigold)" strokeWidth="3" />
    </svg>
  );
}
