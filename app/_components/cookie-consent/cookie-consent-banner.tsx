"use client";

// Canada-facing cookie consent: essential cookies run immediately, analytics
// and marketing cookies only load after an explicit opt-in (PIPEDA — purpose
// must be disclosed, and rejecting must be as easy as accepting). The banner
// shows whenever no choice has been saved yet; "Cookie Preferences" in the
// footer re-opens the settings panel at any time via OPEN_COOKIE_SETTINGS_EVENT.

import { useEffect, useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  saveCookieConsent,
  useCookieConsent,
  type CookieConsentChoice,
  type CookieConsentState,
} from "@/app/_lib/cookie-consent";

const DEFAULT_CHOICE: CookieConsentChoice = { analytics: false, marketing: false };

export default function CookieConsentBanner() {
  const consent = useCookieConsent();
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    function openSettings() {
      setSettingsOpen(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  const bannerVisible = consent === null && !settingsOpen;

  return (
    <>
      {bannerVisible && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-[var(--line)] bg-[var(--card)] shadow-[0_-12px_32px_-16px_rgba(35,32,26,.25)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[var(--ink-muted)] leading-relaxed max-w-2xl">
              We use cookies to run the site, analyze traffic, and personalize content. Essential cookies are
              always on; you choose whether to allow analytics and marketing cookies.
            </p>
            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => saveCookieConsent({ analytics: false, marketing: false })}
                className="btn-secondary inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="btn-ghost inline-flex items-center justify-center rounded-2xl px-3 py-2.5 text-sm"
              >
                Cookie settings
              </button>
              <button
                type="button"
                onClick={() => saveCookieConsent({ analytics: true, marketing: true })}
                className="btn-primary inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {settingsOpen && (
        <CookieSettingsPanel consent={consent} onClose={() => setSettingsOpen(false)} />
      )}
    </>
  );
}

function CookieSettingsPanel({
  consent,
  onClose,
}: {
  consent: CookieConsentState | null;
  onClose: () => void;
}) {
  const [choice, setChoice] = useState<CookieConsentChoice>(() =>
    consent ? { analytics: consent.analytics, marketing: consent.marketing } : DEFAULT_CHOICE
  );

  function commit(next: CookieConsentChoice) {
    saveCookieConsent(next);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center bg-black/40 px-4 py-6">
      <div className="w-full max-w-md rounded-3xl bg-[var(--card)] border border-[var(--line)] shadow-2xl p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[var(--spruce)]" />
            <h2 className="font-display font-semibold text-lg">Cookie settings</h2>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="text-[var(--ink-muted)] hover:text-[var(--ink)]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-[var(--ink-muted)] mt-2 mb-5 leading-relaxed">
          Choose which optional cookies we can use. You can change this anytime from the footer.
        </p>

        <div className="space-y-4">
          <ConsentRow
            title="Essential"
            description="Required for login, security, and core site features. Always on."
            checked
            disabled
          />
          <ConsentRow
            title="Analytics"
            description="Helps us understand site traffic and usage (Google Analytics)."
            checked={choice.analytics}
            onChange={(v) => setChoice((c) => ({ ...c, analytics: v }))}
          />
          <ConsentRow
            title="Marketing"
            description="Used to measure and personalize ads (Meta Pixel)."
            checked={choice.marketing}
            onChange={(v) => setChoice((c) => ({ ...c, marketing: v }))}
          />
        </div>

        <div className="flex gap-2.5 mt-6">
          <button
            type="button"
            onClick={() => commit({ analytics: false, marketing: false })}
            className="btn-secondary flex-1 inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={() => commit(choice)}
            className="btn-primary flex-1 inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm"
          >
            Save preferences
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-[var(--line)] p-4">
      <div>
        <div className="font-medium text-sm text-[var(--ink)]">{title}</div>
        <p className="text-xs text-[var(--ink-muted)] mt-1 leading-relaxed">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative shrink-0 mt-0.5 w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-[var(--spruce)]" : "bg-[var(--line)]"
        } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
