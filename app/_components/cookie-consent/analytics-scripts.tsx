"use client";

// Loads Google Analytics / Meta Pixel only after the visitor has opted in via
// the cookie banner — never on first paint. Mirrors the consent state kept in
// app/_lib/cookie-consent.ts; toggling consent off (Reject / unchecking in
// settings) unmounts the tags so no further tracking calls fire.

import Script from "next/script";
import { useCookieConsent } from "@/app/_lib/cookie-consent";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function AnalyticsScripts() {
  const consent = useCookieConsent();

  const analyticsAllowed = Boolean(consent?.analytics) && Boolean(GA_MEASUREMENT_ID);
  const marketingAllowed = Boolean(consent?.marketing) && Boolean(META_PIXEL_ID);

  return (
    <>
      {analyticsAllowed && (
        <>
          <Script
            id="ga-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){ window.dataLayer.push(arguments); }
              window.gtag = gtag;
              gtag("js", new Date());
              gtag("config", "${GA_MEASUREMENT_ID}", { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {marketingAllowed && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !(function(f,b,e,v,n,t,s){
              if(f.fbq)return;
              n=f.fbq=function(){n.callMethod ?
                n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=true;n.version="2.0";
              n.queue=[];
              t=b.createElement(e);t.async=true;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s);
            })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
            fbq("init", "${META_PIXEL_ID}");
            fbq("track", "PageView");
          `}
        </Script>
      )}
    </>
  );
}
