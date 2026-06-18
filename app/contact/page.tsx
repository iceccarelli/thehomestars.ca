import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container, SectionHeading } from "../_components/ui";
import LeadForm from "../_components/lead-form";
import { REGION, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_TEL } from "../brand";

export const metadata: Metadata = { title: "Contact us", description: "Questions about posting a job, joining as a pro, or listing as a supplier? Get in touch." };

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <SectionHeading eyebrow="Contact" title="Talk to a human" sub="Questions about posting a job, joining as a pro, or listing as a supplier? Send a note and we'll reply by email." />
          <div className="mt-8 space-y-4 text-sm">
            <a href={`tel:${CONTACT_PHONE_TEL}`} className="flex items-center gap-3 text-[var(--spruce)] font-medium"><Phone className="w-5 h-5" /> {CONTACT_PHONE}</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-[var(--spruce)] font-medium"><Mail className="w-5 h-5" /> {CONTACT_EMAIL}</a>
            <div className="flex items-center gap-3 text-[var(--ink-muted)]"><MapPin className="w-5 h-5" /> Serving {REGION}</div>
          </div>
        </div>
        <div className="card rounded-3xl p-6 sm:p-8"><LeadForm kind="contact" /></div>
      </div>
    </Container>
  );
}
