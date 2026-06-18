import Link from "next/link";
import { Star } from "lucide-react";
import React from "react";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
}

type BtnVariant = "primary" | "brass" | "secondary" | "ghost";
type BtnProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: BtnVariant;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};
const VARIANT: Record<BtnVariant, string> = {
  primary: "btn-primary",
  brass: "btn-brass",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};
export function Btn({ children, href, type = "button", variant = "primary", className = "", onClick, disabled }: BtnProps) {
  const base = `${VARIANT[variant]} inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm sm:text-base disabled:opacity-60 disabled:pointer-events-none ${className}`;
  if (href) return <Link href={href} className={base}>{children}</Link>;
  return <button type={type} onClick={onClick} disabled={disabled} className={base}>{children}</button>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow mb-3">{children}</div>;
}

export function SectionHeading({ eyebrow, title, sub, center = false, light = false }: { eyebrow?: string; title: string; sub?: string; center?: boolean; light?: boolean }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && <div className="eyebrow mb-3" style={light ? { color: "var(--brass-light)" } : undefined}>{eyebrow}</div>}
      <h2 className="section-title" style={light ? { color: "#ffffff" } : undefined}>{title}</h2>
      {sub && <p className={`text-base sm:text-lg mt-3 leading-relaxed ${light ? "" : "text-[var(--ink-muted)]"}`} style={light ? { color: "#ffffff" } : undefined}>{sub}</p>}
    </div>
  );
}

export function Rating({ rating, reviews, className = "" }: { rating: number; reviews?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <Star className="w-4 h-4 text-[var(--brass)] fill-current" />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {typeof reviews === "number" && <span className="text-[var(--ink-muted)] text-sm">({reviews} reviews)</span>}
    </span>
  );
}

const AVATAR_BG = ["#1E3A2F", "#2F5A47", "#7A5C2E", "#3A4A3F", "#5A4327"];
export function Avatar({ name, size = 48 }: { name: string; size?: number }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const bg = AVATAR_BG[h % AVATAR_BG.length];
  return (
    <span className="avatar rounded-2xl shrink-0" style={{ width: size, height: size, background: bg, fontSize: size * 0.4 }} aria-hidden="true">
      {initials}
    </span>
  );
}

export function VerifiedBadge() {
  return (
    <span className="bg-[#EAF1EC] text-[var(--spruce)] text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1 shrink-0">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l2.4 1.8 3-.2 1 2.8 2.4 1.8-1 2.8 1 2.8-2.4 1.8-1 2.8-3-.2L12 22l-2.4-1.8-3 .2-1-2.8L3.2 16l1-2.8-1-2.8 2.4-1.8 1-2.8 3 .2L12 2z" fill="currentColor" opacity=".18"/><path d="M8.5 12.5l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      Verified
    </span>
  );
}
