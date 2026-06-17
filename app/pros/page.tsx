import type { Metadata } from "next";
import { Container, SectionHeading } from "../_components/ui";
import ProsBrowser from "../_components/pros-browser";

export const metadata: Metadata = { title: "Find verified pros", description: "Browse insurance-verified renovation pros across Toronto and the GTA. Filter by trade and area, read real reviews, and request quotes." };

export default async function ProsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const sp = await searchParams;
  return (
    <Container className="py-12 sm:py-16">
      <SectionHeading eyebrow="Top rated in the GTA" title="Find verified local pros" sub="Every pro here is insurance-verified and rated only by homeowners who hired them." />
      <div className="mt-8"><ProsBrowser initialCategory={sp.category ?? ""} /></div>
    </Container>
  );
}
