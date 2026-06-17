import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Clock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { PROS, proBySlug, PORTFOLIO } from "../../_lib/data";
import { Container, Avatar, Rating, VerifiedBadge, Btn } from "../../_components/ui";

export function generateStaticParams() {
  return PROS.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pro = proBySlug(slug);
  if (!pro) return { title: "Pro not found" };
  return { title: pro.name, description: `${pro.name} — ${pro.tagline}. ${pro.rating}★ from ${pro.reviews} verified reviews in ${pro.location}.` };
}

const GALLERY = [PORTFOLIO.kitchen, PORTFOLIO.living, PORTFOLIO.bathroom];

export default async function ProPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pro = proBySlug(slug);
  if (!pro) notFound();

  return (
    <Container className="py-10 sm:py-14">
      <Link href="/pros" className="inline-flex items-center gap-2 text-sm text-[var(--ink-muted)] hover:text-[var(--spruce)] mb-6"><ArrowLeft className="w-4 h-4" /> All pros</Link>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-start">
        <div>
          <div className="flex items-start gap-4 sm:gap-5 mb-6">
            <Avatar name={pro.name} size={72} />
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-display text-3xl sm:text-4xl font-semibold">{pro.name}</h1>
                {pro.verified && <VerifiedBadge />}
              </div>
              <p className="text-[var(--ink-muted)] mt-1">{pro.tagline}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-sm text-[var(--ink-muted)]">
                <Rating rating={pro.rating} reviews={pro.reviews} />
                <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {pro.location}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {pro.years} years in business</span>
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-8">{pro.blurb}</p>

          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {pro.highlights.map((h) => (
              <div key={h} className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[var(--brass)] mt-0.5 shrink-0" /><span>{h}</span></div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-semibold mb-4">Recent work</h2>
          <div className="grid grid-cols-3 gap-3 mb-10">
            {GALLERY.map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-square">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Project by ${pro.name}`} loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-semibold mb-4">Verified reviews</h2>
          <div className="space-y-4">
            {pro.recentReviews.map((r, i) => (
              <div key={i} className="card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{r.author}</span>
                  <Rating rating={r.rating} />
                </div>
                <div className="text-xs text-[var(--ink-muted)] mb-3">{r.project}</div>
                <p className="leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="card rounded-3xl p-6 sm:p-7">
            <div className="font-display text-xl font-semibold mb-1">Request a quote</div>
            <p className="text-sm text-[var(--ink-muted)] mb-5">Tell {pro.name.split(" ")[0]} about your project and get an itemized quote — free and no obligation.</p>
            <div className="flex items-center gap-2 text-sm mb-1"><CheckCircle className="w-4 h-4 text-[var(--brass)]" /> Available {pro.available.toLowerCase()}</div>
            <div className="flex items-center gap-2 text-sm mb-5"><CheckCircle className="w-4 h-4 text-[var(--brass)]" /> Serves {pro.serves.join(", ")}</div>
            <Btn href={`/post-job?pro=${pro.slug}`} variant="brass" className="w-full">Request a quote <ArrowRight className="w-4 h-4" /></Btn>
            <div className="flex flex-wrap gap-2 mt-5">
              {pro.specialties.map((s) => <span key={s} className="chip text-xs px-3 py-1">{s}</span>)}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
