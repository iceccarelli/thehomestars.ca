"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu, X, ArrowRight } from "lucide-react";
import { BRAND, REGION } from "@/app/brand";
import AuthNavLink from "./auth-nav-link";

const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pros", label: "Find pros" },
  { href: "/suppliers", label: "Suppliers" },
  { href: "/for-pros", label: "For pros" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  // App-style header: hides when scrolling down, reappears when scrolling up.
  useEffect(() => {
    if (open) { setHidden(false); return; }
    let last = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > last && y > 96) setHidden(true);       // scrolling down, past the header
        else if (y < last - 4) setHidden(false);        // scrolling up
        last = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 bg-[var(--cream)]/90 backdrop-blur border-b border-[var(--line)] transition-transform duration-300 will-change-transform ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <span className="w-9 h-9 sm:w-10 sm:h-10 bg-[var(--spruce)] rounded-xl flex items-center justify-center">
            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--cream)]" />
          </span>
          <span className="leading-none">
            <span className="block font-display font-semibold text-xl sm:text-2xl tracking-tight">{BRAND}</span>
            <span className="block text-[10px] tracking-[0.18em] text-[var(--brass)] mt-0.5">{REGION.toUpperCase()}</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium" aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="nav-link" data-active={isActive(n.href)}>{n.label}</Link>
          ))}
          <AuthNavLink />
          <Link href="/post-job" className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm">
            Post a job <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-[var(--line)]"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-[var(--cream)] px-4 py-4 space-y-1">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className="block px-3 py-3 rounded-xl text-base font-medium hover:bg-[#F1EADA]" data-active={isActive(n.href)}>
              {n.label}
            </Link>
          ))}
          <AuthNavLink variant="mobile" onNavigate={() => setOpen(false)} />
          <Link href="/post-job" onClick={() => setOpen(false)}
            className="btn-primary w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm">
            Post a job <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
