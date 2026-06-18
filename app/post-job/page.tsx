import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { Container } from "../_components/ui";
import LeadForm from "../_components/lead-form";
import { proBySlug, CATEGORIES } from "../_lib/data";

export const metadata: Metadata = { title: "Post your job", description: "Describe your renovation and get free, itemized quotes from vetted GTA pros as they respond." };

export default async function PostJobPage({ searchParams }: { searchParams: Promise<{ pro?: string; category?: string }> }) {
  const sp = await searchParams;
  const pro = sp.pro ? proBySlug(sp.pro) : undefined;
  const categoryName = sp.category && CATEGORIES.find((c) => c.name.toLowerCase() === sp.category!.toLowerCase())?.name;

  const defaults: Record<string, string> = {};
  if (pro) defaults.details = `I'd like a quote from ${pro.name}. `;
  if (categoryName) defaults.category = categoryName;

  return (
    <Container className="py-12 sm:py-16">
      <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
        <div>
          <div className="eyebrow mb-3">Post your job</div>
          <h1 className="section-title mb-3">Tell us about your project</h1>
          <p className="text-[var(--ink-muted)] text-base sm:text-lg mb-2">Free to post. Vetted pros send itemized quotes, and you're notified the moment they respond.</p>
          {pro && <p className="text-sm text-[var(--spruce)] bg-[#EAF1EC] inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"><CheckCircle className="w-4 h-4" /> {pro.name} will be notified of your request</p>}
          <div className="card rounded-3xl p-6 sm:p-8 mt-4">
            <LeadForm kind="job" defaults={defaults} hiddenContext={pro ? { requestedPro: pro.slug } : undefined} />
          </div>
        </div>
        <aside className="lg:sticky lg:top-24">
          <div className="card rounded-3xl p-6 sm:p-7">
            <div className="font-display text-lg font-semibold mb-4">What happens next</div>
            <ol className="space-y-4">
              {[["Post in 2 minutes", "Share scope, budget and timeline."], ["Pros send quotes", "Vetted, itemized, sent straight to you."], ["Compare & choose", "Read reviews, pick your pro, get started."]].map(([t, d], i) => (
                <li key={t} className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--spruce)] text-[var(--cream)] text-sm font-semibold flex items-center justify-center">{i + 1}</span>
                  <span><span className="font-medium block">{t}</span><span className="text-sm text-[var(--ink-muted)]">{d}</span></span>
                </li>
              ))}
            </ol>
            <div className="border-t border-[var(--line)] mt-5 pt-5 text-sm text-[var(--ink-muted)] space-y-2">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[var(--brass)]" /> Free, no obligation</div>
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[var(--brass)]" /> Insurance & licence checked before listing</div>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
