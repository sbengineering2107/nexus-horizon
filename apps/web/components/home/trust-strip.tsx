import { Container } from "@nh/ui";
import { siteConfig } from "@/site.config";

const ITEMS = [
  { label: "MahaRERA registered", detail: `Reg. no. ${siteConfig.maharera}` },
  { label: "Across Pune", detail: "East, west and central micro-markets" },
  { label: "Free first consultation", detail: "On WhatsApp, a call or in person" },
  { label: "One advisor", detail: "From first call to registration" },
];

export function TrustStrip() {
  return (
    <section aria-label="Why you can trust us" className="border-b border-mist-strong bg-paper">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <li key={item.label} className="flex gap-3">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-forest" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="font-semibold text-forest-deep">{item.label}</p>
                <p className="text-sm text-slate">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
