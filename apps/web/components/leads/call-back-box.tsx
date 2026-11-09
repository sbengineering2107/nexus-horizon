import { getServices, type ServiceSlug } from "@/lib/content/services";
import { whatsappChatHref } from "@/lib/cta";
import { LeadForm } from "./lead-form";

/**
 * Sidebar "Request a call back" box. With a service it is pre-selected and hidden;
 * without one the visitor can pick what they're looking for.
 */
export function CallBackBox({ path, service, intro }: { path: string; service?: ServiceSlug; intro: string }) {
  const services = getServices().map((s) => ({ value: s.slug, label: s.title }));
  return (
    <div id="call-back" className="rounded-lg border border-line bg-paper p-6">
      <h2 className="text-xl">Request a call back</h2>
      <p className="mt-2 text-slate">{intro}</p>
      <div className="mt-5">
        <LeadForm formType="quick" sourcePage={path} service={service} services={service ? undefined : services} compact />
      </div>
      <p className="mt-5 border-t border-line pt-4 text-sm text-slate">
        Prefer chat?{" "}
        <a href={whatsappChatHref(path)} target="_blank" rel="noopener" className="font-semibold text-navy underline-offset-4 hover:underline">
          Ask on WhatsApp
        </a>
      </p>
    </div>
  );
}
