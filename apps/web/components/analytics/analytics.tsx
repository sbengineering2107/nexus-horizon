import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { analyticsConfig } from "@/lib/analytics/config";
import { EventTracker } from "./event-tracker";

/** GA4, Microsoft Clarity and Vercel Speed Insights, on the production deployment only. */
export function Analytics() {
  const { gaId, clarityId, speedInsights } = analyticsConfig(process.env);
  return (
    <>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}
      {clarityId && (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      )}
      {(gaId || clarityId) && <EventTracker />}
      {speedInsights && <SpeedInsights />}
    </>
  );
}
