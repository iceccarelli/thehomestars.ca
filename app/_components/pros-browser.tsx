"use client";

import { useMemo, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { PROS, CATEGORIES } from "@/app/_lib/data";
import ProCard from "./pro-card";

const AREAS = ["Toronto", "North York", "Scarborough", "Etobicoke", "Mississauga", "Vaughan", "Markham", "Brampton"];

export default function ProsBrowser({ initialCategory = "" }: { initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [loc, setLoc] = useState("");
  const [active, setActive] = useState(initialCategory);

  const filters = ["All", ...CATEGORIES.map((c) => c.name)];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const l = loc.trim().toLowerCase();
    return PROS.filter((p) => {
      const matchesCat = !active || active === "All"
        || p.category.toLowerCase().includes(active.toLowerCase())
        || p.specialties.some((s) => active.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(active.toLowerCase()));
      const matchesQ = !q
        || p.name.toLowerCase().includes(q)
        || p.specialties.join(" ").toLowerCase().includes(q);
      const matchesLoc = !l
        || p.location.toLowerCase().includes(l)
        || p.serves.join(" ").toLowerCase().includes(l);
      return matchesCat && matchesQ && matchesLoc;
    });
  }, [query, loc, active]);

  const inputCls = "w-full pr-5 py-4 text-base bg-[var(--card)] border border-[var(--line)] rounded-2xl focus:outline-none focus:border-[var(--brass)] shadow-sm";

  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Trade or company — e.g. “kitchen”, “Apex”"
            className={inputCls} style={{ paddingLeft: "3.25rem" }}
          />
        </div>
        <div className="relative">
          <MapPin className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" />
          <input
            type="text" value={loc} onChange={(e) => setLoc(e.target.value)}
            placeholder="Location — e.g. “Scarborough”, “Vaughan”"
            className={inputCls} style={{ paddingLeft: "3.25rem" }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className="text-xs text-[var(--ink-muted)] mr-1">Areas:</span>
        {AREAS.map((a) => {
          const on = loc.toLowerCase() === a.toLowerCase();
          return (
            <button key={a} onClick={() => setLoc(on ? "" : a)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${on ? "bg-[var(--spruce)] text-[var(--cream)] border-[var(--spruce)]" : "bg-[var(--card)] border-[var(--line)] hover:border-[var(--brass)]"}`}>
              {a}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => {
          const on = (active || "All") === f;
          return (
            <button key={f} onClick={() => setActive(f === "All" ? "" : f)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${on ? "bg-[var(--spruce)] text-[var(--cream)] border-[var(--spruce)]" : "bg-[var(--card)] border-[var(--line)] hover:border-[var(--brass)]"}`}>
              {f}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-[var(--ink-muted)] mb-5">
        {results.length} {results.length === 1 ? "pro" : "pros"} found{loc.trim() ? ` in “${loc.trim()}”` : ""}
      </p>

      {results.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {results.map((p) => <ProCard key={p.slug} pro={p} />)}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-[var(--line)] rounded-3xl">
          <p className="font-display text-xl mb-2">No verified pros to show yet</p>
          <p className="text-[var(--ink-muted)] mb-5">We&apos;re onboarding pros across the GTA now. Post your job and the right pros will come to you as they join.</p>
          <a href="/post-job" className="btn-brass inline-flex items-center gap-2 px-6 py-3 rounded-2xl">Post a job</a>
        </div>
      )}
    </div>
  );
}
