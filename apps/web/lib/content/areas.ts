import { PUNE_RATES } from "@/lib/calculators/stamp-duty";
import { areas } from "#site/content";

export type Zone = "west" | "east";
export type CivicBody = "PMC" | "PCMC" | "PMRDA" | "Mixed";

export type Area = {
  slug: string;
  name: string;
  zone: Zone;
  order: number;
  civicBody: CivicBody;
  civicNote: string;
  summary: string;
  knownFor: string[];
  connectivity: string[];
  suits: string;
  nearby: string[];
  sources: string[];
  updated: string;
};

export const ZONES: { id: Zone; name: string; intro: string }[] = [
  {
    id: "west",
    name: "West Pune",
    intro: "From established Aundh and Kothrud to the Hinjewadi IT belt and the PCMC growth corridor along the expressway.",
  },
  {
    id: "east",
    name: "East Pune",
    intro: "Around the airport, Kharadi and Magarpatta business districts, and the Nagar Road and Solapur Road corridors.",
  },
];

const all: Area[] = [...(areas as Area[])].sort((a, b) => (a.zone === b.zone ? a.order - b.order : a.zone === "west" ? -1 : 1));

export function getAreas(): Area[] {
  return all;
}

export function getAreasByZone(zone: Zone): Area[] {
  return all.filter((a) => a.zone === zone);
}

export function getArea(slug: string): Area | null {
  return all.find((a) => a.slug === slug) ?? null;
}

const CIVIC_NAME: Record<CivicBody, string> = {
  PMC: "the Pune Municipal Corporation (PMC)",
  PCMC: "the Pimpri-Chinchwad Municipal Corporation (PCMC)",
  PMRDA: "the Pune Metropolitan Region Development Authority (PMRDA) region, outside the two municipal corporations",
  Mixed: "more than one local body",
};


/** Answer-first FAQs built from the area's own facts, so every page's FAQs are unique. */
/** Nearby area names, e.g. "Balewadi, Aundh and Pashan". */
function nearbyNames(a: Area): string {
  const names = a.nearby.map((slug) => getArea(slug)?.name).filter((n): n is string => Boolean(n));
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : (names[0] ?? "");
}

/** "2026-10-31" → "31 October 2026" (same format as the page's "Last reviewed" line). */
const longDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

function stampDutyAnswer(a: Area): string {
  const { duty, registration, lastVerified } = PUNE_RATES;
  const man = duty["man-or-joint"];
  const woman = duty["woman-sole"];
  const total = man.base + man.metroCess + man.localBodyTax;
  const womanTotal = woman.base + woman.metroCess + woman.localBodyTax;
  const cap = registration.capRupees.toLocaleString("en-IN");
  if (a.civicBody === "PMC" || a.civicBody === "PCMC") {
    return `${a.name} is under ${CIVIC_NAME[a.civicBody]}, so municipal rates apply: ${total}% of the agreement value or the ready reckoner value, whichever is higher (${man.base}% stamp duty, ${man.metroCess}% metro cess and ${man.localBodyTax}% local body tax; ${womanTotal}% for a woman buying in her sole name), plus ${registration.ratePct}% registration capped at ₹${cap}. Rates last checked ${longDate(lastVerified)}; confirm with the sub-registrar before you pay.`;
  }
  return `Parts of ${a.name} fall outside municipal limits, where stamp duty can differ from Pune's municipal rates. Confirm the rate for the specific property with the sub-registrar before you pay; we check this for every property we shortlist.`;
}

/**
 * Questions buyers ask about an area. Answers draw on the area's data and the site's own
 * sourced rates, and never repeat the page's summary or connectivity text word for word.
 */
export function areaFaqs(a: Area): { q: string; a: string }[] {
  const faqs = [
    {
      q: `What stamp duty applies to a flat in ${a.name}?`,
      a: stampDutyAnswer(a),
    },
    {
      q: `How do I check that a project in ${a.name} is registered with MahaRERA?`,
      a: `Search the project's name on the MahaRERA website (maharera.maharashtra.gov.in) and check its registration number, approvals, carpet areas and committed possession date. Our guide on checking a project on MahaRERA walks through each step.`,
    },
    {
      q: `Can you arrange site visits in ${a.name}?`,
      a: `Yes. We shortlist new projects, ready-to-move flats, resale homes and office space in ${a.name} to your budget, verify them and visit with you. Consultations are always free.`,
    },
  ];
  const nearby = nearbyNames(a);
  if (nearby) {
    faqs.push({
      q: `Which areas near ${a.name} should I compare?`,
      a: `Nearby areas worth comparing are ${nearby}; each has its own guide on this site. We can shortlist across them so you compare like for like on price, commute and possession.`,
    });
  }
  return faqs;
}
