import type { Metadata } from "next";
import { Container, SectionHeading } from "../_components/ui";
import ProsBrowser from "../_components/pros-browser";
import SectionBg from "../_components/section-bg";
import { SECTION_PROS } from "../_lib/data";

export const metadata: Metadata = { title: "Find verified pros", description: "Browse renovation pros across Toronto and the GTA, vetted for insurance and licensing. Filter by trade and area and request quotes." };

export default async function ProsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const sp = await searchParams;
  return (
    <>
      <div className="relative overflow-hidden bg-[var(--spruce)] text-[var(--cream)]">
        <SectionBg images={SECTION_PROS} />
        <Container className="relative z-10 py-14 sm:py-20 text-center">
          <SectionHeading center light eyebrow="Top rated in the GTA" title="Find verified local pros" sub="Every pro is insurance- and licence-checked before listing and rated only by homeowners who hired them." />
        </Container>
      </div>
      <Container className="py-10 sm:py-12"><ProsBrowser initialCategory={sp.category ?? ""} /></Container>
    </>
  );
}
