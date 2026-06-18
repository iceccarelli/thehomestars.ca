"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/app/_lib/data";

export type LeadKind = "job" | "pro" | "supplier" | "contact";

type FieldType = "text" | "email" | "tel" | "textarea" | "select";
interface Field { name: string; label: string; type: FieldType; required?: boolean; placeholder?: string; options?: string[]; half?: boolean; }

const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);

const FORMS: Record<LeadKind, { fields: Field[]; cta: string; done: { title: string; body: string } }> = {
  job: {
    cta: "Get my quotes",
    done: { title: "Your job is posted", body: "Verified pros in your area can now see it and will send quotes. We'll email you when the first one lands." },
    fields: [
      { name: "name", label: "Your name", type: "text", required: true, half: true, placeholder: "Jordan Avery" },
      { name: "email", label: "Email", type: "email", required: true, half: true, placeholder: "you@email.com" },
      { name: "phone", label: "Phone (optional)", type: "tel", half: true, placeholder: "(416) 555-0123" },
      { name: "location", label: "Location", type: "text", half: true, placeholder: "Toronto, ON" },
      { name: "title", label: "Project title", type: "text", required: true, placeholder: "Kitchen renovation in Leslieville" },
      { name: "category", label: "Category", type: "select", half: true, options: CATEGORY_NAMES },
      { name: "budget", label: "Budget range", type: "text", half: true, placeholder: "$15,000 – $30,000" },
      { name: "timeline", label: "Ideal timeline", type: "text", half: true, placeholder: "4–6 weeks" },
      { name: "details", label: "Project details", type: "textarea", placeholder: "Scope, materials, anything a pro should know…" },
    ],
  },
  pro: {
    cta: "Apply to join",
    done: { title: "Application received", body: "Our team reviews insurance and licensing before listing. We'll be in touch within two business days." },
    fields: [
      { name: "name", label: "Your name", type: "text", required: true, half: true, placeholder: "Sam Rivera" },
      { name: "email", label: "Email", type: "email", required: true, half: true, placeholder: "you@email.com" },
      { name: "company", label: "Company name", type: "text", required: true, half: true, placeholder: "Rivera Renovations" },
      { name: "phone", label: "Phone", type: "tel", half: true, placeholder: "(416) 555-0123" },
      { name: "trade", label: "Primary trade", type: "select", half: true, options: CATEGORY_NAMES },
      { name: "serviceArea", label: "Service area", type: "text", half: true, placeholder: "Toronto & North York" },
      { name: "message", label: "Tell us about your work", type: "textarea", placeholder: "Years in business, crew size, the projects you do best…" },
    ],
  },
  supplier: {
    cta: "List my business",
    done: { title: "Thanks — we got it", body: "We'll review your catalogue and reach out to set up your supplier listing within two business days." },
    fields: [
      { name: "name", label: "Your name", type: "text", required: true, half: true, placeholder: "Alex Morgan" },
      { name: "email", label: "Email", type: "email", required: true, half: true, placeholder: "you@email.com" },
      { name: "company", label: "Business name", type: "text", required: true, half: true, placeholder: "GTA Tile & Stone" },
      { name: "phone", label: "Phone", type: "tel", half: true, placeholder: "(416) 555-0123" },
      { name: "category", label: "What you supply", type: "text", placeholder: "Porcelain, natural stone, slabs…" },
      { name: "message", label: "Anything else", type: "textarea", placeholder: "Delivery areas, trade pricing, lead times…" },
    ],
  },
  contact: {
    cta: "Send message",
    done: { title: "Message sent", body: "Thanks for reaching out — we'll reply to your email shortly." },
    fields: [
      { name: "name", label: "Your name", type: "text", required: true, half: true, placeholder: "Jordan Avery" },
      { name: "email", label: "Email", type: "email", required: true, half: true, placeholder: "you@email.com" },
      { name: "message", label: "How can we help?", type: "textarea", required: true, placeholder: "Tell us what you need…" },
    ],
  },
};

export default function LeadForm({ kind, defaults = {}, hiddenContext }: { kind: LeadKind; defaults?: Record<string, string>; hiddenContext?: Record<string, string> }) {
  const cfg = FORMS[kind];
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    cfg.fields.forEach((f) => { init[f.name] = defaults[f.name] ?? (f.type === "select" ? (f.options?.[0] ?? "") : ""); });
    return init;
  });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  const set = (name: string, v: string) => setValues((s) => ({ ...s, [name]: v }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Fast client-side check — instant feedback, no wasted round-trip.
    const missing = cfg.fields.filter((f) => f.required && !values[f.name]?.trim()).map((f) => f.label);
    if (missing.length) { setStatus("error"); setError(`Please fill in: ${missing.join(", ")}.`); return; }
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      setStatus("error"); setError("Please enter a valid email address."); return;
    }
    setStatus("sending"); setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: kind, ...hiddenContext, ...values }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) { setStatus("error"); setError(data.error || "Something went wrong. Please try again."); return; }
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("We couldn't reach the server. Check your connection and try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="text-center py-10 px-4">
        <div className="w-14 h-14 rounded-full bg-[#EAF1EC] text-[var(--spruce)] flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7" />
        </div>
        <h3 className="font-display text-2xl font-semibold mb-2">{cfg.done.title}</h3>
        <p className="text-[var(--ink-muted)] max-w-md mx-auto">{cfg.done.body}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cfg.fields.map((f) => {
          const full = !f.half || f.type === "textarea";
          const cls = "w-full border border-[var(--line)] rounded-2xl px-4 sm:px-5 py-3.5 bg-[var(--cream-soft)] focus:outline-none focus:border-[var(--brass)]";
          return (
            <div key={f.name} className={full ? "sm:col-span-2" : ""}>
              <label htmlFor={f.name} className="block text-sm font-medium mb-2">
                {f.label}{f.required && <span className="text-[var(--brass)]"> *</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea id={f.name} name={f.name} required={f.required} rows={4} placeholder={f.placeholder}
                  value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} className={cls} />
              ) : f.type === "select" ? (
                <select id={f.name} name={f.name} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} className={cls}>
                  {f.options?.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input id={f.name} name={f.name} type={f.type} required={f.required} placeholder={f.placeholder}
                  value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} className={cls} />
              )}
            </div>
          );
        })}
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-[#9B2C2C] bg-[#FBEAEA] border border-[#F0CACA] rounded-xl px-4 py-3">{error}</p>
      )}

      <button type="submit" disabled={status === "sending"}
        className="btn-brass w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl text-base font-semibold disabled:opacity-60">
        {status === "sending" ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</> : <>{cfg.cta} <ArrowRight className="w-5 h-5" /></>}
      </button>
      <p className="text-center text-xs text-[var(--ink-muted)]">Free · No obligation · We never sell your details</p>
    </form>
  );
}
