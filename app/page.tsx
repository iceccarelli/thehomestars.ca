'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search, Star, MapPin, Clock, Shield, ArrowRight, CheckCircle,
  Hammer, Home, Menu, X, Phone, Quote,
} from 'lucide-react';

interface Job { id: number; title: string; category: string; location: string; budget: string; timeline: string; description: string; }
interface Pro { id: number; name: string; rating: number; reviews: number; category: string; location: string; verified: boolean; available: string; }
interface Supplier { id: number; name: string; category: string; location: string; rating: number; products: string; }

/* Verified free-to-use photographs (Unsplash License) */
const HERO_SLIDES = [
  { src: 'https://images.unsplash.com/photo-1764526624453-db32c24eca55?auto=format&fit=crop&w=2100&q=80', kb: 'kb1', alt: 'Renovated modern kitchen with wooden cabinets and island' },
  { src: 'https://images.unsplash.com/photo-1759238136854-a43787126db7?auto=format&fit=crop&w=2100&q=80', kb: 'kb2', alt: 'Warm living room with fireplace and minimalist decor' },
  { src: 'https://images.unsplash.com/photo-1680965585463-386646047473?auto=format&fit=crop&w=2100&q=80', kb: 'kb3', alt: 'Living room with wood paneling and natural light' },
];
const EDITORIAL_IMG = 'https://images.unsplash.com/photo-1682888818704-6dc91e9d7532?auto=format&fit=crop&w=1600&q=80';

export default function RenoHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostJob, setShowPostJob] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [slide, setSlide] = useState(0);

  // Rotate hero ~every 5s
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Lock body scroll when the modal or mobile menu is open
  useEffect(() => {
    document.body.style.overflow = showPostJob || mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showPostJob, mobileOpen]);

  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, title: "Kitchen Renovation — Full Gut & Remodel", category: "Kitchen Reno", location: "Toronto, ON", budget: "$25,000 – $45,000", timeline: "6–8 weeks", description: "Complete kitchen renovation including new cabinets, quartz counters, backsplash, and appliances in a detached home in Leaside." },
    { id: 2, title: "Basement Waterproofing & Finishing", category: "Basement", location: "Mississauga, ON", budget: "$18,000 – $32,000", timeline: "4–6 weeks", description: "Waterproofing plus full finishing of 800 sq ft basement with a 3-piece bathroom and bedroom." },
    { id: 3, title: "Master Bathroom Renovation", category: "Bathroom", location: "Toronto, ON", budget: "$12,000 – $22,000", timeline: "3–4 weeks", description: "Luxury master bath update: new tub, glass shower, heated floors, and a custom vanity." },
  ]);

  const [pros] = useState<Pro[]>([
    { id: 1, name: "Apex Renovations Inc.", rating: 4.9, reviews: 187, category: "Full Home Reno", location: "Toronto & GTA", verified: true, available: "Next week" },
    { id: 2, name: "GTA Kitchen Pros", rating: 4.8, reviews: 142, category: "Kitchen & Bath", location: "Toronto, North York, Scarborough", verified: true, available: "This week" },
    { id: 3, name: "Precision Handyman Services", rating: 4.7, reviews: 89, category: "Handyman & Repairs", location: "Mississauga & Etobicoke", verified: true, available: "Tomorrow" },
  ]);

  const [suppliers] = useState<Supplier[]>([
    { id: 1, name: "Toronto Lumber & Building Supply", category: "Lumber & Framing", location: "Toronto", rating: 4.6, products: "Framing lumber, plywood, OSB, engineered wood" },
    { id: 2, name: "Stone & Tile Direct GTA", category: "Tile & Stone", location: "Mississauga", rating: 4.8, products: "Porcelain, ceramic, natural stone, mosaics" },
    { id: 3, name: "Cabinetry Solutions Canada", category: "Cabinets & Millwork", location: "Toronto", rating: 4.5, products: "Custom & semi-custom cabinets, vanities, closets" },
  ]);

  const categories = [
    { name: "Kitchen Renovation" }, { name: "Bathroom Reno" }, { name: "Full Home Reno" },
    { name: "Basement Finishing" }, { name: "Handyman Services" }, { name: "Supplier Quotes" },
  ];

  const navItems = [
    { href: "#how", label: "How it Works" },
    { href: "#pros", label: "Find Pros" },
    { href: "#suppliers", label: "Suppliers" },
    { href: "#jobs", label: "Open Jobs" },
  ];

  const handlePostJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newJob: Job = {
      id: Date.now(),
      title: fd.get('title') as string,
      category: fd.get('category') as string,
      location: fd.get('location') as string,
      budget: fd.get('budget') as string,
      timeline: fd.get('timeline') as string,
      description: fd.get('description') as string,
    };
    setJobs([newJob, ...jobs]);
    setShowPostJob(false);
    alert("Job posted! Verified pros across the Toronto GTA will see it shortly.");
  };

  const openModal = useCallback(() => { setMobileOpen(false); setShowPostJob(true); }, []);

  const filteredJobs = jobs.filter((j) =>
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      {/* ---------------- Navbar ---------------- */}
      <nav className="sticky top-0 z-50 bg-[var(--cream)]/90 backdrop-blur border-b border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[var(--spruce)] rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--cream)]" />
            </div>
            <div className="leading-none">
              <div className="font-display font-semibold text-xl sm:text-2xl tracking-tight">RenoHub</div>
              <div className="text-[10px] tracking-[0.18em] text-[var(--brass)] mt-0.5">TORONTO · GTA</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="nav-link">{n.label}</a>
            ))}
            <button onClick={openModal} className="btn-primary px-5 py-2.5 rounded-full text-sm flex items-center gap-2">
              Post a Job <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-secondary px-5 py-2.5 rounded-full text-sm">For Pros</button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--line)]"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile panel */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--line)] bg-[var(--cream)] px-4 py-4 space-y-1">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-3 rounded-xl text-base font-medium hover:bg-[#F1EADA]"
              >
                {n.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button onClick={openModal} className="btn-primary w-full px-5 py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                Post a Job <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setMobileOpen(false)} className="btn-secondary w-full px-5 py-3 rounded-xl text-sm">For Pros</button>
            </div>
          </div>
        )}
      </nav>

      {/* ---------------- Cinematic Hero ---------------- */}
      <section id="top" className="relative min-h-[78vh] sm:min-h-[82vh] flex items-end overflow-hidden">
        <div className="hero-stage" aria-hidden="true">
          {HERO_SLIDES.map((s, i) => (
            <div key={i} className={`hero-slide ${s.kb} ${i === slide ? 'is-active' : ''}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} />
            </div>
          ))}
          <div className="hero-scrim" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 pt-24 sm:pt-28">
          <div className="max-w-2xl reveal">
            <div className="inline-flex items-center gap-2 bg-[var(--cream)]/90 border border-[var(--line)] rounded-full px-4 py-1.5 text-xs sm:text-sm mb-5 sm:mb-6">
              <span className="w-2 h-2 bg-[var(--brass)] rounded-full animate-pulse" />
              Trusted by 2,400+ homeowners &amp; 680+ pros in the GTA
            </div>

            <h1 className="font-display text-[var(--cream)] font-semibold tracking-tight leading-[1.02] text-4xl sm:text-5xl lg:text-7xl mb-5">
              The smarter way to renovate in Toronto &amp; the GTA
            </h1>
            <p className="text-base sm:text-xl text-[var(--cream)]/90 max-w-xl mb-8">
              One platform. Homeowners, verified local pros, and suppliers — perfectly aligned.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button onClick={openModal} className="btn-brass px-7 sm:px-9 py-4 rounded-2xl text-base sm:text-lg flex items-center justify-center gap-3">
                Post Your Renovation Job <ArrowRight className="w-5 h-5" />
              </button>
              <a href="#pros" className="px-7 sm:px-9 py-4 rounded-2xl text-base sm:text-lg font-semibold flex items-center justify-center gap-3 bg-[var(--cream)]/95 text-[var(--ink)] hover:bg-[var(--cream)] transition-colors">
                Browse Verified Pros
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 text-xs sm:text-sm text-[var(--cream)]/85">
              <span className="flex items-center gap-2"><Shield className="w-4 h-4" /> Insurance verified</span>
              <span className="flex items-center gap-2"><Star className="w-4 h-4" /> Real reviews only</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Toronto &amp; GTA focused</span>
            </div>
          </div>

          {/* slide indicators */}
          <div className="flex gap-2 mt-10" role="tablist" aria-label="Featured renovations">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`slide-dot ${i === slide ? 'is-active' : ''}`}
                aria-label={`Show slide ${i + 1}`}
                aria-selected={i === slide}
                role="tab"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Search ---------------- */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-7 relative z-20 mb-16">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
          <input
            type="text"
            placeholder="Search jobs, pros, or suppliers in the GTA…"
            className="w-full pl-13 pr-5 py-4 sm:py-5 text-base sm:text-lg bg-[var(--card)] border border-[var(--line)] rounded-2xl sm:rounded-3xl focus:outline-none focus:border-[var(--brass)] shadow-sm"
            style={{ paddingLeft: '3.25rem' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ---------------- Categories ---------------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <div key={i} className="card p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col items-center text-center cursor-pointer">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#EFEAD9] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 text-[var(--spruce)]">
                <Hammer className="w-5 h-5" />
              </div>
              <div className="font-medium text-sm sm:text-base">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- Editorial: what good looks like ---------------- */}
      <div className="bg-[var(--spruce)] text-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="eyebrow text-[var(--brass-light)] mb-4">What good looks like</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] mb-6">
              Renovations worth showing off — done by people you can trust
            </h2>
            <p className="text-[var(--cream)]/80 text-base sm:text-lg mb-8 leading-relaxed">
              Every pro on RenoHub is insurance-verified and rated only by homeowners who actually hired them.
              No paid placement, no fake reviews — just real Toronto &amp; GTA craftspeople and transparent quotes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Insurance & licence checked before listing",
                "Reviews from verified, completed projects",
                "Materials sourced from local suppliers",
                "One place to compare quotes side by side",
              ].map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-[var(--brass-light)] shrink-0" />
                  <span className="text-[var(--cream)]/90 text-sm sm:text-base">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={EDITORIAL_IMG} alt="Beautifully renovated bathroom with green cabinetry and marble" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- How it Works ---------------- */}
      <div id="how" className="py-14 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="eyebrow mb-3">Simple · Transparent · Powerful</div>
            <h2 className="section-title">How RenoHub Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Post Your Project", desc: "Describe your renovation, add a budget and photos. Takes about two minutes." },
              { step: "02", title: "Get Matched Instantly", desc: "Verified Toronto & GTA pros see your job and send competitive quotes." },
              { step: "03", title: "Source Materials", desc: "Get real-time quotes from local suppliers, right inside the platform." },
              { step: "04", title: "Hire & Complete", desc: "Choose the best pro and suppliers, then track everything in one place." },
            ].map((item, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-[var(--spruce)] text-[var(--cream)] font-display text-2xl font-semibold mb-5">{item.step}</div>
                <h3 className="font-display font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-[var(--ink-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Featured Pros ---------------- */}
      <div id="pros" className="bg-[var(--cream-soft)] border-y border-[var(--line)] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <div className="eyebrow mb-2">Top rated in the GTA</div>
              <h2 className="section-title">Verified Local Pros</h2>
            </div>
            <a href="#" className="text-[var(--spruce)] font-medium flex items-center gap-2 hover:text-[var(--brass)]">Browse all pros <ArrowRight className="w-4 h-4" /></a>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {pros.map((pro) => (
              <div key={pro.id} className="card p-6 sm:p-8 rounded-3xl">
                <div className="flex justify-between items-start mb-5 gap-3">
                  <div>
                    <div className="font-display font-semibold text-xl">{pro.name}</div>
                    <div className="flex items-center gap-1.5 text-sm text-[var(--ink-muted)] mt-1"><MapPin className="w-4 h-4" /> {pro.location}</div>
                  </div>
                  {pro.verified && <div className="bg-[#EAF1EC] text-[var(--spruce)] text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 shrink-0"><Shield className="w-3 h-3" /> Verified</div>}
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-[var(--brass)]">
                    {[0,1,2,3,4].map((n) => <Star key={n} className="w-4.5 h-4.5 fill-current" style={{ width: '1.1rem', height: '1.1rem' }} />)}
                  </div>
                  <span className="font-semibold">{pro.rating}</span>
                  <span className="text-[var(--ink-muted)] text-sm">({pro.reviews})</span>
                </div>
                <div className="text-sm mb-6"><span className="font-medium">{pro.category}</span> · Available {pro.available}</div>
                <button className="w-full btn-primary py-3.5 rounded-2xl font-semibold">Request Quote</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Suppliers ---------------- */}
      <div id="suppliers" className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <div className="eyebrow mb-2">Integrated supply chain</div>
            <h2 className="section-title">Local Suppliers Marketplace</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {suppliers.map((s) => (
              <div key={s.id} className="card p-6 sm:p-8 rounded-3xl">
                <div className="font-display font-semibold text-xl mb-1">{s.name}</div>
                <div className="text-[var(--ink-muted)] mb-4 text-sm">{s.category} · {s.location}</div>
                <div className="flex items-center gap-2 mb-5">
                  <Star className="w-4 h-4 text-[var(--brass)] fill-current" />
                  <span className="font-medium">{s.rating}</span>
                </div>
                <div className="text-sm text-[var(--ink-muted)] mb-6">{s.products}</div>
                <button className="w-full border border-[var(--spruce)] text-[var(--spruce)] hover:bg-[var(--spruce)] hover:text-[var(--cream)] transition-colors py-3 rounded-2xl font-semibold">Get Instant Quote</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Testimonial strip ---------------- */}
      <div className="bg-[var(--cream-soft)] border-y border-[var(--line)] py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Quote className="w-9 h-9 text-[var(--brass)] mx-auto mb-5" />
          <p className="font-display text-xl sm:text-2xl lg:text-3xl leading-snug mb-6">
            We posted our kitchen reno on a Sunday and had three verified quotes by Tuesday. The whole thing felt
            transparent — no chasing, no guesswork.
          </p>
          <div className="text-[var(--ink-muted)] text-sm">Priya &amp; Daniel — Leaside, Toronto</div>
        </div>
      </div>

      {/* ---------------- Open Jobs ---------------- */}
      <div id="jobs" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="section-title">Active Projects in the GTA</h2>
            <p className="text-[var(--ink-muted)] mt-1">Real jobs posted by homeowners right now</p>
          </div>
          <button onClick={openModal} className="btn-primary px-6 py-3 rounded-2xl flex items-center justify-center gap-2 shrink-0">Post Your Job</button>
        </div>
        <div className="space-y-4">
          {filteredJobs.length > 0 ? filteredJobs.map((job) => (
            <div key={job.id} className="card p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center gap-5 md:gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                  <span className="px-3 py-1 bg-[#EFEAD9] text-xs font-medium rounded-full">{job.category}</span>
                  <span className="text-sm text-[var(--ink-muted)] flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                </div>
                <h3 className="font-display font-semibold text-lg sm:text-xl mb-2">{job.title}</h3>
                <p className="text-[var(--ink-muted)] text-sm sm:text-base">{job.description}</p>
              </div>
              <div className="md:text-right md:shrink-0">
                <div className="text-xl sm:text-2xl font-semibold text-[var(--spruce)] mb-1">{job.budget}</div>
                <div className="text-sm text-[var(--ink-muted)] flex items-center md:justify-end gap-1 mb-4"><Clock className="w-4 h-4" />{job.timeline}</div>
                <button className="btn-secondary px-6 py-2.5 rounded-2xl text-sm font-semibold w-full md:w-auto">View &amp; Quote</button>
              </div>
            </div>
          )) : <p className="text-center py-8 text-[var(--ink-muted)]">No matching jobs. Try broadening your search.</p>}
        </div>
      </div>

      {/* ---------------- Final CTA ---------------- */}
      <div className="bg-[var(--spruce)] text-[var(--cream)] py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-4">Ready to start your renovation the right way?</h2>
          <p className="text-lg sm:text-xl text-[var(--cream)]/85 mb-8">Join thousands of GTA homeowners renovating smarter with RenoHub.</p>
          <button onClick={openModal} className="btn-brass px-9 py-4 rounded-2xl font-semibold text-base sm:text-lg inline-flex items-center gap-3">
            Post Your Job for Free <ArrowRight className="w-5 h-5" />
          </button>
          <div className="mt-4 text-sm text-[var(--cream)]/70">No credit card required · Instant matching with local pros</div>
        </div>
      </div>

      {/* ---------------- Footer ---------------- */}
      <footer className="bg-[var(--cream)] border-t border-[var(--line)] py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[var(--spruce)] rounded-xl flex items-center justify-center"><Home className="w-5 h-5 text-[var(--cream)]" /></div>
            <span className="font-display font-semibold text-lg">RenoHub</span>
          </div>
          <p className="text-sm text-[var(--ink-muted)]">Built for Toronto &amp; the Greater Toronto Area. Real local focus, better outcomes.</p>
          <a href="tel:+14160000000" className="flex items-center gap-2 text-sm text-[var(--spruce)] font-medium"><Phone className="w-4 h-4" /> (416) 000-0000</a>
        </div>
      </footer>

      {/* ---------------- Post Job Modal ---------------- */}
      {showPostJob && (
        <div className="fixed inset-0 bg-black/60 flex items-start sm:items-center justify-center z-[100] p-4 sm:p-6 overflow-y-auto" onClick={() => setShowPostJob(false)}>
          <div className="bg-[var(--card)] rounded-3xl max-w-2xl w-full p-6 sm:p-10 relative my-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowPostJob(false)} className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F1EADA]" aria-label="Close"><X className="w-5 h-5" /></button>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-2 pr-8">Post Your Renovation Project</h3>
            <p className="text-[var(--ink-muted)] mb-7 sm:mb-8">Get quotes from verified Toronto &amp; GTA pros within hours.</p>
            <form onSubmit={handlePostJob} className="space-y-5 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Project Title</label>
                <input name="title" required className="w-full border border-[var(--line)] rounded-2xl px-4 sm:px-5 py-3.5 bg-[var(--cream-soft)] focus:outline-none focus:border-[var(--brass)]" placeholder="e.g. Kitchen Renovation in Leslieville" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select name="category" className="w-full border border-[var(--line)] rounded-2xl px-4 sm:px-5 py-3.5 bg-[var(--cream-soft)] focus:outline-none focus:border-[var(--brass)]">
                    <option>Kitchen Reno</option><option>Bathroom Reno</option><option>Full Home Reno</option><option>Basement Finishing</option><option>Handyman / Repairs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input name="location" required defaultValue="Toronto, ON" className="w-full border border-[var(--line)] rounded-2xl px-4 sm:px-5 py-3.5 bg-[var(--cream-soft)] focus:outline-none focus:border-[var(--brass)]" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <input name="budget" required placeholder="$15,000 – $30,000" className="w-full border border-[var(--line)] rounded-2xl px-4 sm:px-5 py-3.5 bg-[var(--cream-soft)] focus:outline-none focus:border-[var(--brass)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Desired Timeline</label>
                  <input name="timeline" required placeholder="4–6 weeks" className="w-full border border-[var(--line)] rounded-2xl px-4 sm:px-5 py-3.5 bg-[var(--cream-soft)] focus:outline-none focus:border-[var(--brass)]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Details</label>
                <textarea name="description" required rows={4} className="w-full border border-[var(--line)] rounded-2xl px-4 sm:px-5 py-4 bg-[var(--cream-soft)] focus:outline-none focus:border-[var(--brass)]" placeholder="Describe the scope, requirements, and materials preferences…" />
              </div>
              <button type="submit" className="w-full btn-brass py-4 rounded-2xl text-base sm:text-lg font-semibold">Post Job &amp; Get Quotes</button>
              <p className="text-center text-xs text-[var(--ink-muted)]">Free to post · Pros respond directly · No obligation</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
