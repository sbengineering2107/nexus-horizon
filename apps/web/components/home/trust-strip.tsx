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
    <section aria-label="Why you can trust us" className="border-y border-line bg-paper">
      <Container>
        <ul className="grid grid-cols-2 divide-line py-7 lg:grid-cols-4 lg:divide-x">
          {ITEMS.map((item) => (
            <li key={item.label} className="py-2 pr-4 lg:px-6 lg:first:pl-0">
              <p className="font-semibold text-forest-deep">{item.label}</p>
              <p className="mt-0.5 text-sm text-slate">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
