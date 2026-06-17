import { Container, Btn } from "./_components/ui";

export default function NotFound() {
  return (
    <Container className="py-24 sm:py-32 text-center max-w-xl">
      <div className="font-display text-7xl font-semibold text-[var(--spruce)] mb-4">404</div>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-3">We couldn&apos;t find that page</h1>
      <p className="text-[var(--ink-muted)] mb-8">The link may be old or mistyped. Here are some good places to go instead.</p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Btn href="/" variant="primary">Back home</Btn>
        <Btn href="/pros" variant="secondary">Find pros</Btn>
        <Btn href="/post-job" variant="secondary">Post a job</Btn>
      </div>
    </Container>
  );
}
