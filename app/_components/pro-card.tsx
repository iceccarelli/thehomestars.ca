import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Pro } from "@/app/_lib/data";
import { Avatar, Rating, VerifiedBadge } from "./ui";

export default function ProCard({ pro }: { pro: Pro }) {
  return (
    <div className="card p-6 sm:p-7 rounded-3xl flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <Avatar name={pro.name} size={52} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/pros/${pro.slug}`} className="font-display font-semibold text-lg leading-tight hover:text-[var(--spruce)]">{pro.name}</Link>
            {pro.verified && <VerifiedBadge />}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[var(--ink-muted)] mt-1"><MapPin className="w-4 h-4" /> {pro.location} · serves {pro.serves.length} areas</div>
        </div>
      </div>
      <p className="text-sm text-[var(--ink-muted)] mb-4 leading-relaxed">{pro.tagline}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {pro.specialties.slice(0, 3).map((s) => <span key={s} className="chip text-xs px-3 py-1">{s}</span>)}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <Rating rating={pro.rating} reviews={pro.reviews} />
        <span className="text-xs text-[var(--ink-muted)]">Available {pro.available.toLowerCase()}</span>
      </div>
      <Link href={`/pros/${pro.slug}`} className="btn-primary mt-5 inline-flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold">
        View profile <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
