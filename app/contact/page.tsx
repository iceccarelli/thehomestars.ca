import type { Metadata } from "next";
import { Phone, Mail, MapPin } from "lucide-react";
import { Container, SectionHeading } from "../_components/ui";
import LeadForm from "../_components/lead-form";
import { REGION } from "../brand";

export const metadata: Metadata = { title: "Contact us", description: "Questions about posting a job, joining as a pro, or listing as a supplier? Get in touch." };

export default function ContactPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <SectionHeading eyebrow="Contact" title="Talk to a human" sub="Questions about posting a job, joining as a pro, or listing as a supplier? Send a note and we'll reply by email." />
          <div className="mt-8 space-y-4 text-sm">
            <a href="tel:+14165550100" className="flex items-center gap-3 text-[var(--spruce)] font-medium"><Phone className="w-5 h-5" /> (416) 555-0100</a>
            <a href="mailto:hello@example.com" className="flex items-center gap-3 text-[var(--spruce)] font-medium"><Mail className="w-5 h-5" /> hello@example.com</a>
            <div className="flex items-center gap-3 text-[var(--ink-muted)]"><MapPin className="w-5 h-5" /> Serving {REGION}</div>
          </div>
        </div>
        <div className="card rounded-3xl p-6 sm:p-8"><LeadForm kind="contact" /></div>
      </div>
    </Container>
  );
}
