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

const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** Answer-first FAQs built from the area's own facts, so every page's FAQs are unique. */
export function areaFaqs(a: Area): { q: string; a: string }[] {
  return [
    {
      q: `Where is ${a.name} in Pune?`,
      a: a.summary,
    },
    {
      q: `Which local body governs ${a.name}?`,
      a: `${a.name} falls under ${CIVIC_NAME[a.civicBody]}. ${a.civicNote}`,
    },
    {
      q: `How well connected is ${a.name}?`,
      a: a.connectivity.join(" "),
    },
    {
      q: `Who is ${a.name} suited for?`,
      a: `It typically suits ${lowerFirst(a.suits).replace(/\.$/, "")}. Talk to us for current options and an honest view of the trade-offs.`,
    },
  ];
}
