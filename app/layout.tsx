import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BRAND, REGION, BRAND_TAGLINE } from "./brand";
import SiteHeader from "./_components/site-header";
import SiteFooter from "./_components/site-footer";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://thehomestars.ca"),
  title: { default: `${BRAND} | ${REGION} Home Renovation Marketplace`, template: `%s · ${BRAND}` },
  description: `${BRAND_TAGLINE} Post your project, match with verified ${REGION} pros, and source materials — all in one place.`,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: `${BRAND} — Renovate smarter in ${REGION}`,
    description: BRAND_TAGLINE,
    type: "website",
    siteName: BRAND,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND} — Renovate smarter in ${REGION}`,
    description: BRAND_TAGLINE,
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#1E3A2F" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
