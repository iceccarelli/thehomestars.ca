'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import CookieConsentBanner from './_components/cookie-consent/cookie-consent-banner';
import AnalyticsScripts from './_components/cookie-consent/analytics-scripts';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <CookieConsentBanner />
      <AnalyticsScripts />
      <Toaster
        position="top-center"
        richColors
        closeButton
        className="font-sans"
        toastOptions={{
          classNames: {
            toast: 'group toast group-[.toaster]:bg-[var(--card)] group-[.toaster]:text-[var(--ink)] group-[.toaster]:border-[var(--line)]',
            description: 'group-[.toast]:text-[var(--ink-muted)]',
            actionButton: 'group-[.toast]:bg-[var(--brass)] group-[.toast]:text-white',
            cancelButton: 'group-[.toast]:bg-[var(--ink-muted)] group-[.toast]:text-white',
          },
        }}
      />
    </SessionProvider>
  );
}
