set -euo pipefail
cat > app/brand.ts <<'TS'
export const BRAND = "ProHomes";
export const LEGAL_NAME =
  "Promaxima Home Renovation Marketplace and Digital Contractor Platform Inc.";
export const REGION = "Toronto GTA";
export const BRAND_TAGLINE =
  "Homeowners, verified local pros, and suppliers — aligned in one place.";
export const POWERED_BY_NAME = "Grimaldi Engineering";
export const POWERED_BY_URL = "https://igrimaldi.engineering/";
export const CONTACT_NAME = "Maria Luisa Grimaldi";
export const CONTACT_EMAIL = "service@thehomestars.ca";
export const CONTACT_PHONE = "+1 (416) 249-1276";
export const CONTACT_PHONE_TEL = "+14162491276";
export const CONTACT_ADDRESS = "32 Norfield Crescent, Toronto, ON";
export const CONTACT_ADDRESS_STREET = "32 Norfield Crescent";
export const CONTACT_ADDRESS_CITY = "Toronto";
export const CONTACT_ADDRESS_REGION = "ON";
export const CONTACT_ADDRESS_COUNTRY = "CA";
export const CONTACT_MAP_QUERY = "32 Norfield Crescent, Toronto, ON";
export const SOCIAL: { name: string; label: string; href: string }[] = [
  { name: "facebook", label: "Facebook", href: "https://www.facebook.com/prohomes" },
  { name: "instagram", label: "Instagram", href: "https://www.instagram.com/prohomes" },
  { name: "x", label: "X", href: "https://x.com/prohomes" },
  { name: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@prohomes" },
  { name: "youtube", label: "YouTube", href: "https://www.youtube.com/@prohomes" },
  { name: "pinterest", label: "Pinterest", href: "https://www.pinterest.com/prohomes" },
  { name: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/prohomes" },
  { name: "whatsapp", label: "WhatsApp", href: "https://wa.me/14162491276" },
  { name: "snapchat", label: "Snapchat", href: "https://www.snapchat.com/add/prohomes" },
];
TS
python3 - <<'PY'
import io
def patch(p, r):
    s=io.open(p,encoding="utf-8").read()
    for a,b in r: s=s.replace(a,b)
    io.open(p,"w",encoding="utf-8").write(s)
patch("app/_components/site-footer.tsx",[
 ('import { BRAND, REGION, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_ADDRESS } from "@/app/brand";',
  'import { BRAND, LEGAL_NAME, REGION, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_ADDRESS, POWERED_BY_NAME, POWERED_BY_URL } from "@/app/brand";'),
 ('          <span>© {new Date().getFullYear()} {BRAND}. A {REGION} renovation marketplace.</span>\n          <div className="flex items-center gap-4">\n            <span>Insurance-verified pros · Real reviews only · No paid placement</span>\n            <CookiePreferencesButton />\n          </div>\n        </div>',
  '          <span>© {new Date().getFullYear()} {LEGAL_NAME} — {BRAND}. A {REGION} renovation marketplace.</span>\n          <div className="flex items-center gap-4">\n            <span>Insurance-verified pros · Real reviews only · No paid placement</span>\n            <CookiePreferencesButton />\n          </div>\n        </div>\n        <div className="mt-5 pt-5 border-t border-[var(--line)] text-center text-xs text-[var(--ink-muted)]">\n          Powered by{" "}\n          <a href={POWERED_BY_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--spruce)] hover:text-[var(--brass)] transition-colors">{POWERED_BY_NAME}</a>\n        </div>'),
])
patch("app/_components/chat-widget.tsx",[
 ('import { useState, useEffect, useRef } from "react";',
  'import { useState, useEffect, useRef } from "react";\nimport { BRAND } from "@/app/brand";'),
 ('aria-label="Chat with RenoHub"','aria-label={`Chat with ${BRAND}`}'),
 ('aria-label="RenoHub chat"','aria-label={`${BRAND} chat`}'),
 ('>RenoHub Concierge<','>{BRAND} Concierge<'),
 ('<strong>RenoHub</strong>','<strong>{BRAND}</strong>'),
 ('Verified local pros · RenoHub','Verified local pros · {BRAND}'),
])
patch("app/api/chat/route.ts",[
 ("RenoHub is onboarding verified ${REGION} pros","${BRAND} is onboarding verified ${REGION} pros"),
 ("RenoHub is onboarding pros in your area","${BRAND} is onboarding pros in your area"),
])
patch("lib/ai.ts",[
 ("3. Confirm honestly: their job is saved, RenoHub is actively onboarding","3. Confirm honestly: their job is saved, ${BRAND} is actively onboarding"),
 ("// ─── RenoHub customer-facing chat","// ─── ProHomes customer-facing chat"),
])
patch("prisma/seed.ts",[
 ("RenoHub — Prisma Seed Script","ProHomes — Prisma Seed Script"),
 ("Seeding RenoHub database","Seeding ProHomes database"),
 ("companyName: 'RenoHub Inc.'","companyName: 'Promaxima Home Renovation Marketplace and Digital Contractor Platform Inc.'"),
 ("Mike @ RenoHub","Mike @ ProHomes"),
])
patch("package.json",[('"name": "renovahub"','"name": "prohomes"')])
print("patched")
PY
grep -rn "RenoHub" --include="*.ts" --include="*.tsx" --include="*.json" app lib prisma package.json | grep -v "RENOHUB_CHAT_PROMPT" || echo "NONE — clean"
