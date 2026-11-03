/** Hosts whose pages the site shows as sources: government, regulators, statutory bodies and banks' own sites. */
const SUFFIXES = [".gov.in", ".nic.in", ".bank.in"];
const HOSTS = ["rbi.org.in", "punemetrorail.org", "mahametro.org"];

export function isOfficialSource(url: string): boolean {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return false;
  }
  return SUFFIXES.some((s) => host.endsWith(s)) || HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
}

/** The official subset of a guide's research sources, in their original order. */
export function officialSources(urls: string[]): string[] {
  return urls.filter(isOfficialSource);
}

const NAMES: [string, string][] = [
  ["maharera.maharashtra.gov.in", "MahaRERA"],
  ["igrmaharashtra.gov.in", "IGR Maharashtra"],
  ["rbi.org.in", "Reserve Bank of India"],
  ["incometaxindia.gov.in", "Income Tax Department"],
  ["incometax.gov.in", "Income Tax Department"],
  ["cbic-gst.gov.in", "CBIC (GST)"],
  ["cbic.gov.in", "CBIC"],
  ["gstcouncil.gov.in", "GST Council"],
  ["indiacode.nic.in", "India Code"],
  ["pmc.gov.in", "Pune Municipal Corporation"],
  ["pcmcindia.gov.in", "Pimpri-Chinchwad Municipal Corporation"],
  ["pmrda.gov.in", "PMRDA"],
  ["punemetrorail.org", "Pune Metro"],
  ["mahametro.org", "Maha-Metro"],
  ["sbi.bank.in", "State Bank of India"],
  ["icici.bank.in", "ICICI Bank"],
  ["kotak.bank.in", "Kotak Mahindra Bank"],
  ["federal.bank.in", "Federal Bank"],
  ["hdfc.bank.in", "HDFC Bank"],
  ["maharashtra.gov.in", "Government of Maharashtra"],
];

/** Readable publisher name for an official URL, e.g. "MahaRERA". Falls back to the host. */
export function sourceName(url: string): string {
  const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  return NAMES.find(([h]) => host === h || host.endsWith(`.${h}`))?.[1] ?? host;
}

/** Host and path without scheme or "www.", for showing under the publisher name. */
export function shortUrl(url: string): string {
  const u = new URL(url);
  return `${u.hostname.replace(/^www\./, "")}${decodeURIComponent(u.pathname).replace(/\/$/, "")}`;
}
