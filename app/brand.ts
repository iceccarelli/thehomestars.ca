// ============================================================================
// BRAND — single source of truth for the visible brand name.
//
// ⚠️  PLACEHOLDER. Do NOT ship "thehomestars"/"HomeStars" as the visible brand:
//     it is confusingly similar to HomeStars (homestars.com, Toronto, IAC/Instapro)
//     and operating a GTA home-reno marketplace under it invites a CIRA CDRP
//     complaint that could delete the domain. Pick a distinctive, CIPO-clearable
//     name, run a knockout search, then change ONLY this value.
//
//     thehomestars.ca can remain as a passive 301 redirect to the real brand.
// ============================================================================
export const BRAND = "RenoHub";
export const REGION = "Toronto GTA";
export const BRAND_TAGLINE =
  "Homeowners, verified local pros, and suppliers — aligned in one place.";

// Business contact details — single source of truth. Surfaced in the footer,
// on /contact (with map), and in LocalBusiness structured data.
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

// Social profiles shown in the footer. PLACEHOLDER handles — replace each href
// with your real profile URL before launch / before running ads. Order here is
// the order they appear. `name` must match an icon in _components/social-links.
export const SOCIAL: { name: string; label: string; href: string }[] = [
  { name: "facebook", label: "Facebook", href: "https://www.facebook.com/renohub" },
  { name: "instagram", label: "Instagram", href: "https://www.instagram.com/renohub" },
  { name: "x", label: "X", href: "https://x.com/renohub" },
  { name: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@renohub" },
  { name: "youtube", label: "YouTube", href: "https://www.youtube.com/@renohub" },
  { name: "pinterest", label: "Pinterest", href: "https://www.pinterest.com/renohub" },
  { name: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/renohub" },
  { name: "whatsapp", label: "WhatsApp", href: "https://wa.me/14162491276" },
  { name: "snapchat", label: "Snapchat", href: "https://www.snapchat.com/add/renohub" },
];
