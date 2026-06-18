import type { Metadata } from "next";
import { Container, SectionHeading } from "../_components/ui";
import SupplierCard from "../_components/supplier-card";
import LeadForm from "../_components/lead-form";
import SectionBg from "../_components/section-bg";
import { SUPPLIERS, SECTION_SUPPLIERS } from "../_lib/data";

export const metadata: Metadata = { title: "Local suppliers", description: "Source tile, stone, cabinets, lumber and more from vetted GTA suppliers with trade pricing and jobsite delivery." };

export default function SuppliersPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-[var(--spruce)] text-[var(--cream)]">
        <SectionBg images={SECTION_SUPPLIERS} />
        <Container className="relative z-10 py-14 sm:py-20 text-center">
          <SectionHeading center light eyebrow="Integrated supply chain" title="Source materials from local suppliers" sub="Trade pricing and reliable delivery from suppliers vetted for quality and service across the GTA." />
        </Container>
      </div>
      <Container className="py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SUPPLIERS.map((s) => <SupplierCard key={s.slug} supplier={s} />)}
        </div>
      </Container>

      <div id="list" className="bg-[var(--cream-soft)] border-t border-[var(--line)] py-14 sm:py-20 scroll-mt-24">
        <Container className="max-w-2xl">
          <SectionHeading eyebrow="For suppliers" title="List your supply business" sub="Reach homeowners and pros with active renovation projects in your delivery area." center />
          <div className="card rounded-3xl p-6 sm:p-8 mt-8"><LeadForm kind="supplier" /></div>
        </Container>
      </div>
    </>
  );
}
