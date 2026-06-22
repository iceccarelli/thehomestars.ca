"use client";

import { requestCookieSettings } from "@/app/_lib/cookie-consent";

export default function CookiePreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={requestCookieSettings} className={`hover:text-[var(--spruce)] transition-colors ${className}`}>
      Cookie preferences
    </button>
  );
}
