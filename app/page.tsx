import Link from "next/link";
import { ArrowRight, CheckCircle, Hammer, Quote } from "lucide-react";
import Hero from "./_components/hero";
import ProCard from "./_components/pro-card";
import SupplierCard from "./_components/supplier-card";
import { Container, SectionHeading, Btn } from "./_components/ui";
import { PROS, SUPPLIERS, CATEGORIES, PORTFOLIO } from "./_lib/data";

const STEPS = [
  { step: "01", title: "Post your project", desc: "Describe your renovation, add a budget and photos. About two minutes." },
  { step: "02", title: "Get matched", desc: "Verified GTA pros see your job and send competitive quotes." },
  { step: "03", title: "Source materials", desc: "Pull real-time quotes from local suppliers, right in the platform." },
  { step: "04", title: "Hire & complete", desc: "Compare quotes, choose your pro, and track everything in one place." },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats strip */}
      <div className="bg-[var(--cream-soft)] border-b border-[var(--line)]">
        <Container className="py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[["2,400+", "Homeowners served"], ["680+", "Verified pros"], ["4.8★", "Average pro rating"], ["48 hrs", "Median time to first quote"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-2xl sm:text-3xl font-semibold text-[var(--spruce)]">{n}</div>
              <div className="text-xs sm:text-sm text-[var(--ink-muted)] mt-1">{l}</div>
            </div>
          ))}
        </Container>
      </div>

      {/* Categories */}
      <Container className="py-14 sm:py-20">
        <SectionHeading eyebrow="Browse by need" title="What are you renovating?" sub="Pick a category to see verified pros who specialize in exactly that." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-8">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/pros?category=${encodeURIComponent(cat.name)}`}
              className="card p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col items-center text-center">
              <span className="w-11 h-11 sm:w-12 sm:h-12 bg-[#EFEAD9] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 text-[var(--spruce)]"><Hammer className="w-5 h-5" /></span>
              <span className="font-medium text-sm sm:text-base">{cat.name}</span>
            </Link>
          ))}
        </div>
      </Container>

      {/* Editorial */}
      <div className="bg-[var(--spruce)] text-[var(--cream)]">
        <Container className="py-14 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="eyebrow text-[var(--brass-light)] mb-4">What good looks like</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-6">Renovations worth showing off — by people you can trust</h2>
            <p className="text-[var(--cream)]/80 text-base sm:text-lg mb-8 leading-relaxed">
              Every pro is insurance-verified and rated only by homeowners who actually hired them. No paid placement, no fake reviews — just real {""}
              GTA craftspeople and transparent quotes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {["Insurance & licence checked before listing", "Reviews from verified, completed projects", "Materials from local suppliers", "Compare quotes side by side"].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-[var(--brass-light)] shrink-0" />
                  <span className="text-[var(--cream)]/90 text-sm sm:text-base">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PORTFOLIO.bathroom} alt="Renovated bathroom with green cabinetry and marble" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </Container>
      </div>

      {/* How it works teaser */}
      <Container className="py-14 sm:py-20">
        <SectionHeading eyebrow="Simple · Transparent · Powerful" title="How it works" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {STEPS.map((s) => (
            <div key={s.step} className="text-center sm:text-left">
              <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-[var(--spruce)] text-[var(--cream)] font-display text-2xl font-semibold mb-5">{s.step}</div>
              <h3 className="font-display font-semibold text-xl mb-2">{s.title}</h3>
              <p className="text-[var(--ink-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10"><Btn href="/how-it-works" variant="secondary">See the full process <ArrowRight className="w-4 h-4" /></Btn></div>
      </Container>

      {/* Featured pros */}
      <div className="bg-[var(--cream-soft)] border-y border-[var(--line)] py-14 sm:py-20">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <SectionHeading eyebrow="Top rated in the GTA" title="Verified local pros" />
            <Link href="/pros" className="btn-ghost inline-flex items-center gap-2">Browse all pros <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {PROS.slice(0, 3).map((p) => <ProCard key={p.slug} pro={p} />)}
          </div>
        </Container>
      </div>

      {/* Suppliers preview */}
      <Container className="py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <SectionHeading eyebrow="Integrated supply chain" title="Source materials locally" />
          <Link href="/suppliers" className="btn-ghost inline-flex items-center gap-2">All suppliers <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SUPPLIERS.map((s) => <SupplierCard key={s.slug} supplier={s} />)}
        </div>
      </Container>

      {/* Testimonial */}
      <div className="bg-[var(--cream-soft)] border-y border-[var(--line)] py-14 sm:py-16">
        <Container className="max-w-3xl text-center">
          <Quote className="w-9 h-9 text-[var(--brass)] mx-auto mb-5" />
          <p className="font-display text-xl sm:text-2xl lg:text-3xl leading-snug mb-6">We posted our kitchen reno on a Sunday and had three verified quotes by Tuesday. The whole thing felt transparent — no chasing, no guesswork.</p>
          <div className="text-[var(--ink-muted)] text-sm">Priya &amp; Daniel — Leaside, Toronto</div>
        </Container>
      </div>

      {/* Final CTA */}
      <div className="bg-[var(--spruce)] text-[var(--cream)] py-16 sm:py-20">
        <Container className="max-w-3xl text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-4">Ready to start your renovation the right way?</h2>
          <p className="text-lg sm:text-xl text-[var(--cream)]/85 mb-8">Join thousands of GTA homeowners renovating smarter.</p>
          <Btn href="/post-job" variant="brass" className="px-9 py-4 text-base sm:text-lg">Post your job for free <ArrowRight className="w-5 h-5" /></Btn>
          <div className="mt-4 text-sm text-[var(--cream)]/70">No credit card required · Instant matching with local pros</div>
        </Container>
      </div>
    </>
  );
}
