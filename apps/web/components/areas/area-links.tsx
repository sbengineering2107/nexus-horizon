import Link from "next/link";
import type { Area, Zone } from "@/lib/content/areas";

/** Wrap of area name links for one zone; used on the home page and the Pune hub. */
export function AreaLinks({ zone, areas, size = "md" }: { zone: Zone; areas: Area[]; size?: "md" | "lg" }) {
  return (
    <ul data-zone={zone} className="flex flex-wrap gap-2.5">
      {areas.map((a) => (
        <li key={a.slug}>
          <Link
            href={`/pune/${a.slug}`}
            className={`inline-flex items-center rounded-full border border-line bg-white text-basalt transition-colors hover:border-navy hover:text-navy ${
              size === "lg" ? "px-4 py-2 text-base" : "px-3.5 py-1.5 text-[0.95rem]"
            }`}
          >
            {a.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
