import Link from "next/link";
import { Home, Phone, Mail } from "lucide-react";
import { BRAND, REGION } from "@/app/brand";

const COLS = [
  { title: "Homeowners", links: [
    { href: "/how-it-works", label: "How it works" },
    { href: "/pros", label: "Find verified pros" },
    { href: "/suppliers", label: "Suppliers" },
    { href: "/post-job", label: "Post a job" },
  ]},
  { title: "Pros & suppliers", links: [
    { href: "/for-pros", label: "Join as a pro" },
    { href: "/suppliers#list", label: "List your supply business" },
    { href: "/contact", label: "Contact us" },
  ]},
];

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--cream)] border-t border-[var(--line)] pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="w-9 h-9 bg-[var(--spruce)] rounded-xl flex items-center justify-center"><Home className="w-5 h-5 text-[var(--cream)]" /></span>
              <span className="font-display font-semibold text-lg">{BRAND}</span>
            </Link>
            <p className="text-sm text-[var(--ink-muted)] mt-3 max-w-xs leading-relaxed">
              Built for {REGION}. Real local focus, verified pros, and transparent quotes — better outcomes for everyone.
            </p>
            <div className="flex flex-col gap-2 mt-4 text-sm">
              <a href="tel:+14165550100" className="inline-flex items-center gap-2 text-[var(--spruce)] font-medium"><Phone className="w-4 h-4" /> (416) 555-0100</a>
              <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 text-[var(--spruce)] font-medium"><Mail className="w-4 h-4" /> hello@example.com</a>
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <div className="eyebrow mb-4">{col.title}</div>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-sm text-[var(--ink-muted)] hover:text-[var(--spruce)] transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--line)] mt-10 pt-6 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-[var(--ink-muted)]">
          <span>© {new Date().getFullYear()} {BRAND}. A {REGION} renovation marketplace.</span>
          <span>Insurance-verified pros · Real reviews only · No paid placement</span>
        </div>
      </div>
    </footer>
  );
}
