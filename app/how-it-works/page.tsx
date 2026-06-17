import type { Metadata } from "next";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Container, SectionHeading, Btn } from "../_components/ui";

export const metadata: Metadata = { title: "How it works", description: "Post a project, get matched with verified GTA pros, source materials, and complete your renovation — all in one place." };

const STEPS = [
  { step: "01", title: "Post your project", desc: "Tell us what you're renovating, your budget, and your timeline. Add photos if you have them. It takes about two minutes and it's free." },
  { step: "02", title: "Get matched with verified pros", desc: "Pros who specialize in your type of work and serve your area see your job and send competitive, itemized quotes — usually within 48 hours." },
  { step: "03", title: "Source materials locally", desc: "Need tile, cabinets, or lumber? Request quotes from local suppliers without leaving the platform, so your pro and your materials stay in sync." },
  { step: "04", title: "Hire, build, and track", desc: "Compare quotes side by side, read verified reviews, choose your pro, and keep messages, milestones, and documents in one place." },
];
const FAQ = [
  { q: "Is it free for homeowners?", a: "Yes. Posting a job and receiving quotes is completely free. You only ever pay the pro you choose, on terms you agree with them directly." },
  { q: "How are pros verified?", a: "Before a pro is listed we check business registration, liability insurance, and applicable trade licensing. Reviews come only from homeowners with a completed project." },
  { q: "How fast will I hear back?", a: "Most homeowners receive their first quote within 48 hours. Popular trades in dense areas are often faster." },
  { q: "What areas do you cover?", a: "Toronto and the Greater Toronto Area — including North York, Scarborough, Etobicoke, Mississauga, Vaughan, Markham, and surrounding municipalities." },
];

export default function HowItWorksPage() {
  return (
    <>
      <div className="bg-[var(--spruce)] text-[var(--cream)]">
        <Container className="py-16 sm:py-20 text-center max-w-3xl">
          <div className="eyebrow text-[var(--brass-light)] mb-3">How it works</div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold leading-tight mb-5">From idea to finished reno, without the guesswork</h1>
          <p className="text-[var(--cream)]/85 text-lg">One place for homeowners, verified pros, and suppliers — so quotes are transparent and nothing falls through the cracks.</p>
        </Container>
      </div>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 max-w-3xl mx-auto">
          {STEPS.map((s) => (
            <div key={s.step} className="flex gap-5 sm:gap-7">
              <div className="shrink-0 inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-[var(--spruce)] text-[var(--cream)] font-display text-2xl font-semibold">{s.step}</div>
              <div>
                <h2 className="font-display font-semibold text-2xl mb-2">{s.title}</h2>
                <p className="text-[var(--ink-muted)] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12"><Btn href="/post-job" variant="brass" className="px-8 py-4">Post your job for free <ArrowRight className="w-5 h-5" /></Btn></div>
      </Container>

      <div className="bg-[var(--cream-soft)] border-y border-[var(--line)] py-14 sm:py-20">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Good to know" title="Common questions" center />
          <div className="mt-10 space-y-6">
            {FAQ.map((f) => (
              <div key={f.q} className="card rounded-2xl p-6">
                <h3 className="font-display font-semibold text-lg mb-2 flex items-start gap-2"><CheckCircle className="w-5 h-5 text-[var(--brass)] mt-0.5 shrink-0" />{f.q}</h3>
                <p className="text-[var(--ink-muted)] leading-relaxed pl-7">{f.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
