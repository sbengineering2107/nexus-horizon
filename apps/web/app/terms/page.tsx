import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@nh/ui";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

/** Change this date (and PAGE_UPDATED["/terms"]) whenever the text changes. */
const EFFECTIVE = "24 November 2026";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use and Disclaimer",
  description:
    "The terms for using the Nexus Horizon Advisors website: how to read property information, prices and calculator results, our MahaRERA registration, and governing law.",
  path: "/terms",
});

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h2 id={id} className="text-2xl sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-basalt">{children}</div>
    </section>
  );
}

const list = "list-disc space-y-2 pl-5 marker:text-gold-deep";
const link = "font-semibold text-navy underline underline-offset-2";

export default function TermsPage() {
  const { address } = siteConfig;
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Terms and disclaimer", path: "/terms" }]} />
      <article className="mt-8 max-w-[70ch]">
        <h1 className="text-4xl sm:text-5xl">Terms of use and disclaimer</h1>
        <p className="mt-4 text-slate">Effective {EFFECTIVE}</p>
        <p className="mt-6 text-lg text-basalt">
          These terms apply to your use of this website. By using it you agree to them. If you do not agree, please do
          not use the site. Our{" "}
          <Link href="/privacy-policy" className={link}>
            privacy policy
          </Link>{" "}
          explains how we handle the details you share with us.
        </p>

        <Section id="who" title="Who we are">
          <p>
            {siteConfig.name} is a real estate advisory in {address.city}, registered with MahaRERA as a real estate
            agent (registration no. {siteConfig.maharera}), with its office at {address.street}, {address.city},{" "}
            {address.region}. We help people buy new, ready-to-move, resale and commercial property. Consultations are
            always free.
          </p>
        </Section>

        <Section id="not-an-offer" title="Information on this site is not an offer">
          <p>
            Everything on this website is general information to help you understand the Pune property market. It is
            not an offer, invitation or advertisement to sell any specific property, and no agreement is formed by
            reading it or by sending us an enquiry. Any purchase is made only through an agreement with the developer or
            seller.
          </p>
          <ul className={list}>
            <li>
              Prices, price ranges, rents, yields and appreciation figures are indicative. They change with the market
              and with each project, floor and unit.
            </li>
            <li>
              Area information, such as infrastructure, metro lines, roads and schools, is based on public sources at
              the time of writing. Timelines for government projects can change.
            </li>
            <li>
              Photographs and illustrations on this site are for illustration only and do not show specific projects.
            </li>
          </ul>
        </Section>

        <Section id="verify" title="Please verify before you buy">
          <p>
            Before you commit to any property, check its details with the original sources. In particular:
          </p>
          <ul className={list}>
            <li>
              Check the project&apos;s registration, approvals, carpet area and possession date on the{" "}
              <a href="https://maharera.maharashtra.gov.in" className={link} rel="noopener" target="_blank">
                MahaRERA website
              </a>
              .
            </li>
            <li>Read the agreement for sale and the developer&apos;s documents yourself, or with your lawyer.</li>
            <li>Confirm stamp duty, registration charges and taxes with the registration office or your adviser.</li>
          </ul>
          <p>
            We help you with these checks, but the final decision to buy, and the responsibility for it, is yours.
          </p>
        </Section>

        <Section id="calculators" title="Calculators and guides">
          <p>
            Our calculators (EMI, loan eligibility, stamp duty, rental yield and others) give estimates based on the
            figures you enter and the rates and rules we have used. Actual loan offers, EMIs, charges and taxes are set
            by banks and authorities and may differ. Our guides and calculators are not legal, tax or financial advice;
            for that, please consult a qualified professional.
          </p>
        </Section>

        <Section id="our-role" title="Our role">
          <p>
            We are an independent advisory, not a developer, bank or lender. We do not guarantee loan approval, prices,
            returns, rental income or possession dates, which are set by developers, sellers, banks and authorities.
            If a paid service or brokerage applies to a transaction, we will tell you before you commit to it.
          </p>
        </Section>

        <Section id="links" title="Links to other websites">
          <p>
            This site links to government and other external websites for reference. We do not control them and are
            not responsible for their content or availability.
          </p>
        </Section>

        <Section id="use" title="Using this website">
          <ul className={list}>
            <li>Please give accurate details when you contact us, and only your own.</li>
            <li>Do not misuse the site, for example by sending spam or trying to disrupt it.</li>
            <li>
              The text, design and logo on this site belong to {siteConfig.name}. You may share links and quote short
              extracts with credit, but please do not copy whole pages.
            </li>
          </ul>
        </Section>

        <Section id="liability" title="Limit of our liability">
          <p>
            We take care to keep this website accurate and up to date, but we cannot promise that it is always complete,
            current or error-free. To the extent the law allows, we are not liable for any loss arising from relying on
            the general information on this site without checking it as described above.
          </p>
        </Section>

        <Section id="law" title="Governing law">
          <p>
            These terms are governed by the laws of India. Any dispute about them is subject to the courts in Pune,
            Maharashtra.
          </p>
        </Section>

        <Section id="changes" title="Changes and contact">
          <p>
            We may update these terms; the date at the top shows the latest version. Questions? Call us on{" "}
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className={link}>
              {siteConfig.phone}
            </a>{" "}
            or use the{" "}
            <Link href="/contact" className={link}>
              contact page
            </Link>
            .
          </p>
        </Section>
      </article>
    </Container>
  );
}
