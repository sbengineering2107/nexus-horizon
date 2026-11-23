import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@nh/ui";
import { siteConfig } from "@/site.config";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ATTRIBUTION_MAX_AGE } from "@/lib/leads/attribution";

/** Change this date whenever the policy text changes. */
const EFFECTIVE = "22 November 2026";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Nexus Horizon Advisors collects, uses and protects the details you share on this website, and your rights under India's DPDP Act, 2023.",
  path: "/privacy-policy",
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

export default function PrivacyPolicyPage() {
  const { address } = siteConfig;
  const cookieDays = Math.round(ATTRIBUTION_MAX_AGE / 86400);
  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy policy", path: "/privacy-policy" }]} />
      <article className="mt-8 max-w-[70ch]">
        <h1 className="text-4xl sm:text-5xl">Privacy policy</h1>
        <p className="mt-4 text-slate">Effective {EFFECTIVE}</p>
        <p className="mt-6 text-lg text-basalt">
          This policy explains what personal data {siteConfig.name} collects through this website, why, who we share it
          with and the choices you have. We follow India&apos;s Digital Personal Data Protection Act, 2023. We do not ask
          for sensitive information such as Aadhaar, PAN, bank or card details through this website.
        </p>

        <Section id="who" title="Who we are">
          <p>
            {siteConfig.name} is a real estate advisory registered with MahaRERA as an agent (registration no.{" "}
            {siteConfig.maharera}), with its office at {address.street}, {address.city}, {address.region}. We decide how
            the personal data described here is used, which makes us the &ldquo;data fiduciary&rdquo; under the Act.
          </p>
        </Section>

        <Section id="collect" title="What we collect">
          <p>
            <strong>Details you give us.</strong> When you fill in a form on this website we collect your name and mobile
            number, and anything else you choose to add: email address, the type of property you are looking for,
            preferred area, budget range, buying timeline, a message, or the calculator result you ask us to review. We
            also record that you ticked the consent box, when, and which version of the consent wording you agreed to.
          </p>
          <p>
            <strong>How you found us.</strong> On your first visit we store, in a cookie on your device for{" "}
            {cookieDays} days, the page you landed on, the website that referred you (the site only, not the page) and
            any advertising tags in the link (such as UTM tags or a Google Ads click ID). If you send an enquiry, these are
            saved with it so we know which pages and campaigns help people find us.
          </p>
          <p>
            <strong>How the website is used.</strong> Analytics tools record pages viewed, clicks on buttons such as
            WhatsApp and Call, device and browser type, approximate location and similar usage information. See{" "}
            <a href="#cookies" className="font-semibold text-navy underline underline-offset-2">
              cookies and analytics
            </a>
            .
          </p>
          <p>
            <strong>When you call or WhatsApp us.</strong> Calls and WhatsApp messages are handled on our phones, outside
            this website. WhatsApp&apos;s own privacy policy applies to messages sent through it.
          </p>
        </Section>

        <Section id="use" title="How we use it">
          <ul className={list}>
            <li>To reply to your enquiry and give you the advice you asked for, by call, WhatsApp or email.</li>
            <li>To shortlist properties, arrange site visits and support you through to registration, if you go ahead.</li>
            <li>To understand which pages, guides and campaigns are useful, and to improve the website.</li>
            <li>To keep a record of your consent and meet our legal and regulatory obligations.</li>
          </ul>
          <p>We use your details only for these purposes. We do not sell your personal data or rent it to anyone.</p>
        </Section>

        <Section id="share" title="Who we share it with">
          <ul className={list}>
            <li>
              <strong>Service providers who run the website for us:</strong> Vercel (hosting), Neon (the database that
              stores enquiries), Google Analytics and Microsoft Clarity (website analytics). They process data on our
              instructions and may store it on servers in India or abroad.
            </li>
            <li>
              <strong>Developers, sellers, banks or lawyers:</strong> only when you are going ahead with a specific
              property or loan and you have agreed that we may pass on your details for it.
            </li>
            <li>
              <strong>Authorities:</strong> where the law requires it, for example a request from a regulator or court.
            </li>
          </ul>
        </Section>

        <Section id="cookies" title="Cookies and analytics">
          <ul className={list}>
            <li>
              <strong>Attribution cookie (nh_attr):</strong> set by us, kept for {cookieDays} days, records how you first
              arrived, as described above.
            </li>
            <li>
              <strong>Google Analytics:</strong> counts visits and measures how pages are used, including clicks on
              WhatsApp, Call and form submissions.
            </li>
            <li>
              <strong>Microsoft Clarity:</strong> shows us heatmaps and anonymised recordings of how pages are used, so we
              can spot confusing layouts. Clarity masks text typed into form fields by default.
            </li>
            <li>
              <strong>Vercel Speed Insights:</strong> measures how fast pages load, without cookies.
            </li>
          </ul>
          <p>
            You can block or delete cookies in your browser settings. The website still works; we just won&apos;t know how
            you found us.
          </p>
        </Section>

        <Section id="keep" title="How long we keep it">
          <p>
            We keep enquiry details while we are helping you and for up to three years after our last contact, so we can
            follow up on your search and answer questions about past advice, unless the law requires us to keep them
            longer. You can ask us to delete them sooner. Analytics data is kept according to each provider&apos;s
            retention settings.
          </p>
        </Section>

        <Section id="security" title="How we protect it">
          <p>
            Enquiries are sent over an encrypted connection and stored in a database that only we can access. We limit
            who in our team can see them and use them only for the purposes above.
          </p>
        </Section>

        <Section id="rights" title="Your rights">
          <p>Under the Digital Personal Data Protection Act, 2023 you can:</p>
          <ul className={list}>
            <li>ask what personal data we hold about you and how we have used it;</li>
            <li>ask us to correct, complete or update it;</li>
            <li>ask us to delete it;</li>
            <li>withdraw your consent at any time, as easily as you gave it; we will then stop contacting you;</li>
            <li>nominate someone to exercise these rights for you if you are unable to;</li>
            <li>raise a grievance with us, and if you are not satisfied with our response, complain to the Data Protection Board of India.</li>
          </ul>
          <p>
            This website is meant for adults. We do not knowingly collect personal data from anyone under 18.
          </p>
        </Section>

        <Section id="contact" title="Contact us about your data">
          <p>
            For any request or concern about your personal data, call or WhatsApp us on{" "}
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="font-semibold text-navy underline underline-offset-2">
              {siteConfig.phone}
            </a>
            {siteConfig.email ? (
              <>
                {" "}
                or email{" "}
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-navy underline underline-offset-2">
                  {siteConfig.email}
                </a>
              </>
            ) : null}
            , or write to us at {address.street}, {address.city}. We will respond as soon as we can, and within the time
            the law requires.
          </p>
        </Section>

        <Section id="changes" title="Changes to this policy">
          <p>
            If we change this policy we will update it on this page and change the effective date above. If a change
            affects how we use details you have already given us, we will ask for your consent again where the law
            requires it.
          </p>
          <p>
            <Link href="/contact" className="font-semibold text-navy underline underline-offset-2">
              Contact us
            </Link>{" "}
            if you have any questions.
          </p>
        </Section>
      </article>
    </Container>
  );
}
