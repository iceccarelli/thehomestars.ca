import type { Metadata } from "next";
import { Phone, Mail, MapPin, User } from "lucide-react";
import { Container, SectionHeading } from "../_components/ui";
import LeadForm from "../_components/lead-form";
import {
  BRAND, REGION, CONTACT_NAME, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL,
  CONTACT_ADDRESS, CONTACT_ADDRESS_STREET, CONTACT_ADDRESS_CITY, CONTACT_ADDRESS_REGION,
  CONTACT_ADDRESS_COUNTRY, CONTACT_MAP_QUERY,
} from "../brand";

export const metadata: Metadata = { title: "Contact us", description: "Questions about posting a job, joining as a pro, or listing as a supplier? Get in touch." };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: BRAND,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE_TEL,
  areaServed: REGION,
  founder: CONTACT_NAME,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT_ADDRESS_STREET,
    addressLocality: CONTACT_ADDRESS_CITY,
    addressRegion: CONTACT_ADDRESS_REGION,
    addressCountry: CONTACT_ADDRESS_COUNTRY,
  },
};

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <SectionHeading eyebrow="Contact" title="Talk to a human" sub="Questions about posting a job, joining as a pro, or listing as a supplier? Send a note and we'll reply by email." />
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3 text-[var(--ink)] font-medium"><User className="w-5 h-5 text-[var(--spruce)]" /> {CONTACT_NAME}</div>
            <a href={`tel:${CONTACT_PHONE_TEL}`} className="flex items-center gap-3 text-[var(--spruce)] font-medium"><Phone className="w-5 h-5" /> {CONTACT_PHONE}</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-[var(--spruce)] font-medium"><Mail className="w-5 h-5" /> {CONTACT_EMAIL}</a>
            <div className="flex items-start gap-3 text-[var(--ink-muted)]"><MapPin className="w-5 h-5 mt-0.5 shrink-0" /> {CONTACT_ADDRESS}</div>
          </div>

          <div className="mt-8 rounded-3xl overflow-hidden border border-[var(--line)] shadow-sm">
            <iframe
              title={`${BRAND} location — ${CONTACT_ADDRESS}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT_MAP_QUERY)}&output=embed`}
              width="100%"
              height="300"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_MAP_QUERY)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-sm text-[var(--spruce)] font-medium hover:underline"
          >
            <MapPin className="w-4 h-4" /> Open in Google Maps
          </a>
        </div>

        <div className="card rounded-3xl p-6 sm:p-8"><LeadForm kind="contact" /></div>
      </div>
    </Container>
  );
}
