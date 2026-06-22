// ============================================================================
// Cookie consent — PIPEDA-style model for Canadian visitors.
//
// Essential cookies are always on (no consent needed to run the site).
// Analytics/marketing scripts (GA, Meta Pixel) must not load until the
// visitor explicitly opts in, and rejecting/withdrawing must be as easy as
// accepting. State lives in localStorage; useCookieConsent() exposes it as a
// live external store so the banner, footer link, and script loader all stay
// in sync without prop drilling.
// ============================================================================

import { useSyncExternalStore } from "react";

export const COOKIE_CONSENT_KEY = "cookie_consent";
export const CONSENT_CHANGED_EVENT = "cookie-consent-changed";
export const OPEN_COOKIE_SETTINGS_EVENT = "cookie-consent-open-settings";

export interface CookieConsentChoice {
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentState extends CookieConsentChoice {
  essential: true;
  acceptedAt: string;
  country: "CA";
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function getCookieConsent(): CookieConsentState | null {
  if (!isBrowser()) return null;
  try {
    const saved = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return saved ? (JSON.parse(saved) as CookieConsentState) : null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(choice: CookieConsentChoice): CookieConsentState {
  const state: CookieConsentState = {
    essential: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    acceptedAt: new Date().toISOString(),
    country: "CA",
  };

  if (isBrowser()) {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
  }

  return state;
}

export function clearCookieConsent() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

export function requestCookieSettings() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}

// Caches the parsed value so repeated snapshot reads return a stable
// reference between actual localStorage writes, as useSyncExternalStore requires.
let cachedRaw: string | null = null;
let cachedState: CookieConsentState | null = null;

function getSnapshot(): CookieConsentState | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedState = raw ? (JSON.parse(raw) as CookieConsentState) : null;
    } catch {
      cachedState = null;
    }
  }
  return cachedState;
}

function getServerSnapshot(): CookieConsentState | null {
  return null;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onStoreChange);
}

/** Live cookie consent, re-rendering whenever it's saved/cleared anywhere on the page. */
export function useCookieConsent(): CookieConsentState | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
