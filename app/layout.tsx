import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RenoHub | Toronto & GTA Home Renovation Marketplace",
  description:
    "The all-in-one platform for homeowners, verified contractors, and suppliers across Toronto and the GTA. Post your project, get matched with trusted local pros, and source materials — all in one place.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "RenoHub — Renovate smarter in Toronto & the GTA",
    description:
      "Homeowners, verified local pros, and suppliers — perfectly aligned on one platform.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E3A2F",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
