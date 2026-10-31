"use client";

/** Previous / next buttons that scroll a snap carousel by one card. */
export function CarouselControls({ target }: { target: string }) {
  const scroll = (dir: 1 | -1) => {
    const track = document.getElementById(target);
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };
  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-forest/30 text-forest transition-colors hover:bg-forest hover:text-paper";
  return (
    <div className="flex gap-2">
      <button type="button" aria-label="Previous testimonial" aria-controls={target} onClick={() => scroll(-1)} className={btn}>
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 10H5M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" aria-label="Next testimonial" aria-controls={target} onClick={() => scroll(1)} className={btn}>
        <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
