import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { Container, SectionHeading } from "../_components/ui";
import LeadForm from "../_components/lead-form";

export const metadata: Metadata = { title: "For pros", description: "Win local renovation work without chasing leads. Join verified GTA pros getting matched to homeowners ready to hire." };

const REASONS = [
  ["Qualified local leads", "Homeowners post real projects with budgets and timelines — no tire-kickers, no shared lead spam."],
  ["You set your terms", "Quote what you want, work how you work. We connect you; you own the relationship."],
  ["Build a verified reputation", "Reviews come only from completed jobs, so good work compounds into more work."],
  ["No paid placement", "Ranking is earned through ratings and responsiveness — not who pays the most."],
];

export default function ForProsPage() {
  return (
    <>
      <div className="bg-[var(--spruce)] text-[var(--cream)]">
        <Container className="py-16 sm:py-20 max-w-3xl text-center">
          <div className="eyebrow text-[var(--brass-light)] mb-3">For pros & contractors</div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-5">Win local work without chasing leads</h1>
          <p className="text-[var(--cream)]/85 text-lg">Get matched with GTA homeowners who are ready to hire — and spend your time building, not bidding.</p>
        </Container>
      </div>

      <Container className="py-14 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <SectionHeading eyebrow="Why join" title="Built for pros who do great work" />
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {REASONS.map(([t, d]) => (
                <div key={t}>
                  <div className="flex items-center gap-2 font-display font-semibold text-lg mb-1"><CheckCircle className="w-5 h-5 text-[var(--brass)]" />{t}</div>
                  <p className="text-sm text-[var(--ink-muted)] leading-relaxed pl-7">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card rounded-3xl p-6 sm:p-8">
            <div className="font-display text-2xl font-semibold mb-1">Apply to join</div>
            <p className="text-sm text-[var(--ink-muted)] mb-6">We verify insurance and licensing before listing. Takes two business days.</p>
            <LeadForm kind="pro" />
          </div>
        </div>
      </Container>
    </>
  );
}
