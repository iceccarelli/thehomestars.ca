"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Star, MapPin } from "lucide-react";
import { HERO_IMAGES } from "@/app/_lib/data";

const SLIDES = HERO_IMAGES;

export default function Hero() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[78vh] sm:min-h-[82vh] flex items-end overflow-hidden">
      <div className="hero-stage" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <div key={i} className={`hero-slide kb${(i % 8) + 1} ${i === slide ? "is-active" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt="" loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} />
          </div>
        ))}
        <div className="hero-scrim" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 pt-24 sm:pt-28">
        <div className="max-w-2xl reveal">
          <div className="inline-flex items-center gap-2 bg-[var(--cream)]/90 border border-[var(--line)] rounded-full px-4 py-1.5 text-xs sm:text-sm mb-5 sm:mb-6">
            <span className="w-2 h-2 bg-[var(--brass)] rounded-full animate-pulse" />
            Now onboarding GTA homeowners, pros &amp; suppliers
          </div>
          <h1 className="font-display text-[var(--cream)] font-semibold tracking-tight leading-[1.02] text-4xl sm:text-5xl lg:text-7xl mb-5">
            The smarter way to renovate in Toronto &amp; the GTA
          </h1>
          <p className="text-base sm:text-xl text-[var(--cream)]/90 max-w-xl mb-8">
            One platform. Homeowners, verified local pros, and suppliers — perfectly aligned.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/post-job" className="btn-brass inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-4 rounded-2xl text-base sm:text-lg">
              Post your renovation job <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/pros" className="inline-flex items-center justify-center gap-3 px-7 sm:px-9 py-4 rounded-2xl text-base sm:text-lg font-semibold bg-[var(--cream)]/95 text-[var(--ink)] hover:bg-[var(--cream)] transition-colors">
              Browse verified pros
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-xs sm:text-sm text-[var(--cream)]/85">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Insurance &amp; licence checked at onboarding</span>
            <span className="flex items-center gap-2"><Star className="w-4 h-4" /> Reviews only from completed jobs</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Toronto &amp; GTA focused</span>
          </div>
        </div>
        <div className="flex gap-2 mt-10" role="tablist" aria-label="Featured renovations">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`slide-dot ${i === slide ? "is-active" : ""}`}
              role="tab" aria-selected={i === slide} aria-label={`Show slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
