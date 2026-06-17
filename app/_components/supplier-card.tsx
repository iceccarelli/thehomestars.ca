import Link from "next/link";
import { MapPin, Truck, ArrowRight } from "lucide-react";
import type { Supplier } from "@/app/_lib/data";
import { Avatar, Rating } from "./ui";

export default function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <div className="card p-6 sm:p-7 rounded-3xl flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <Avatar name={supplier.name} size={52} />
        <div className="min-w-0 flex-1">
          <div className="font-display font-semibold text-lg leading-tight">{supplier.name}</div>
          <div className="flex items-center gap-1.5 text-sm text-[var(--ink-muted)] mt-1"><MapPin className="w-4 h-4" /> {supplier.category} · {supplier.location}</div>
        </div>
      </div>
      <p className="text-sm text-[var(--ink-muted)] mb-4 leading-relaxed">{supplier.blurb}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {supplier.products.slice(0, 3).map((p) => <span key={p} className="chip text-xs px-3 py-1">{p}</span>)}
      </div>
      <div className="flex items-center justify-between mb-5">
        <Rating rating={supplier.rating} reviews={supplier.reviews} />
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-muted)]"><Truck className="w-4 h-4" /> {supplier.delivery}</span>
      </div>
      <Link href={`/post-job?category=materials`} className="btn-secondary mt-auto inline-flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold">
        Request a material quote <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
