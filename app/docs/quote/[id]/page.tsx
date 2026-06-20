import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { format } from 'date-fns';
import { BRAND, REGION, CONTACT_ADDRESS, CONTACT_PHONE } from '@/app/brand';

function formatCAD(n: number | { toNumber(): number }) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(
    typeof n === 'number' ? n : n.toNumber()
  );
}

export default async function PublicQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const { id } = await params;

  const quote = await db.quoteRequest.findUnique({ where: { id } });

  if (!quote || !quote.quotePdfUrl || (quote.quotePdfUrl as string).startsWith('data:')) {
    notFound();
  }

  const isAdmin = session.user.role === 'ADMIN';
  const isOwner =
    (quote.userId != null && quote.userId === session.user.id) ||
    quote.email === session.user.email;
  if (!isAdmin && !isOwner) notFound();

  const proxyUrl = `/api/docs/quote/${id}`;
  const downloadUrl = `${proxyUrl}?dl=1`;

  const subtotal = quote.quotedAmount ? Number(quote.quotedAmount) : null;
  const taxRate = quote.quoteTaxRate ? Number(quote.quoteTaxRate) : 13;
  const total = subtotal != null ? subtotal * (1 + taxRate / 100) : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--p-surface-warm)', fontFamily: 'sans-serif', color: 'var(--ink)' }}>
      {/* Header */}
      <div style={{ background: 'var(--p-dark)', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: 'var(--p-cream)', fontSize: '18px', fontWeight: 300, letterSpacing: '2px' }}>{BRAND.toUpperCase()}</div>
          <div style={{ color: 'var(--p-accent)', fontSize: '11px', letterSpacing: '0.1em' }}>{REGION.toUpperCase()} HOME RENOVATION</div>
        </div>
        <a
          href={downloadUrl}
          download
          style={{
            background: 'var(--p-accent)',
            color: 'var(--p-cream)',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
          }}
        >
          Download PDF
        </a>
      </div>

      {/* Document info */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{
          background: 'var(--p-surface)',
          border: '1px solid var(--p-line-strong)',
          borderRadius: '10px',
          padding: '28px 32px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Estimate</div>
            <div style={{ fontSize: '20px', fontWeight: 700 }}>
              {quote.service
                ? quote.service.charAt(0).toUpperCase() + quote.service.slice(1)
                : 'Home Renovation Estimate'}
            </div>
            {(quote.city || quote.province) && (
              <div style={{ fontSize: '14px', color: 'var(--ink-muted)', marginTop: '4px' }}>
                {[quote.city, quote.province].filter(Boolean).join(', ')}
              </div>
            )}
          </div>

          <div style={{ textAlign: 'right' }}>
            {total != null && (
              <>
                <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginBottom: '4px' }}>Total</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--p-accent)' }}>
                  {formatCAD(total)}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ink-muted)' }}>Includes HST ({taxRate}%)</div>
              </>
            )}
            {quote.quoteIssuedAt && (
              <div style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '8px' }}>
                Issued {format(quote.quoteIssuedAt, 'MMMM d, yyyy')}
              </div>
            )}
            {quote.quoteValidUntil && (
              <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
                Valid until {format(quote.quoteValidUntil, 'MMMM d, yyyy')}
              </div>
            )}
          </div>
        </div>

        {/* PDF Viewer */}
        <div style={{ background: 'var(--p-surface)', border: '1px solid var(--p-line-strong)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--p-line-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Estimate Document</span>
            <a href={downloadUrl} style={{ color: 'var(--p-accent)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              Open in new tab ↗
            </a>
          </div>
          <iframe
            src={proxyUrl}
            style={{ width: '100%', height: '800px', border: 'none', display: 'block' }}
            title="Estimate PDF"
          />
        </div>

        <div style={{ textAlign: 'center', padding: '24px', fontSize: '12px', color: 'var(--ink-muted)' }}>
          {BRAND} · {CONTACT_ADDRESS} · {CONTACT_PHONE}
        </div>
      </div>
    </div>
  );
}
