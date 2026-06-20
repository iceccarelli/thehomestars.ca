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

const statusLabel: Record<string, string> = {
  DRAFT: 'Draft',
  SENT: 'Due',
  OVERDUE: 'Overdue',
  PAID: 'Paid',
  VOID: 'Void',
};

const statusColor: Record<string, string> = {
  DRAFT: 'var(--ink-muted)',
  SENT: 'var(--p-accent)',
  OVERDUE: 'var(--p-danger)',
  PAID: 'var(--p-success)',
  VOID: 'var(--ink-muted)',
};

export default async function PublicInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');

  const { id } = await params;

  const invoice = await db.invoice.findUnique({
    where: { id },
    include: { project: { include: { user: { select: { name: true, email: true } } } } },
  });

  // Ownership check: admin sees all, customer sees only their own
  if (
    invoice &&
    session.user.role !== 'ADMIN' &&
    invoice.project.userId !== session.user.id
  ) {
    notFound();
  }

  if (!invoice || !invoice.pdfUrl || invoice.pdfUrl.startsWith('data:')) {
    notFound();
  }

  const proxyUrl = `/api/docs/invoice/${id}`;
  const downloadUrl = `${proxyUrl}?dl=1`;

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
            <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Invoice</div>
            <div style={{ fontSize: '24px', fontWeight: 700 }}>#{invoice.number ?? invoice.id.slice(0, 8).toUpperCase()}</div>
            {invoice.project?.title && (
              <div style={{ fontSize: '14px', color: 'var(--ink-muted)', marginTop: '4px' }}>{invoice.project.title}</div>
            )}
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '99px',
              fontSize: '13px',
              fontWeight: 600,
              background: `${statusColor[invoice.status]}18`,
              color: statusColor[invoice.status],
              marginBottom: '8px',
            }}>
              {statusLabel[invoice.status] ?? invoice.status}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--p-accent)' }}>
              {formatCAD(invoice.total)}
            </div>
            {invoice.dueDate && (
              <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
                Due {format(invoice.dueDate, 'MMMM d, yyyy')}
              </div>
            )}
            {invoice.issuedAt && (
              <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>
                Issued {format(invoice.issuedAt, 'MMMM d, yyyy')}
              </div>
            )}
          </div>
        </div>

        {/* PDF Viewer */}
        <div style={{ background: 'var(--p-surface)', border: '1px solid var(--p-line-strong)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--p-line-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>Invoice Document</span>
            <a href={downloadUrl} style={{ color: 'var(--p-accent)', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
              Open in new tab ↗
            </a>
          </div>
          <iframe
            src={proxyUrl}
            style={{ width: '100%', height: '800px', border: 'none', display: 'block' }}
            title={`Invoice #${invoice.number}`}
          />
        </div>

        <div style={{ textAlign: 'center', padding: '24px', fontSize: '12px', color: 'var(--ink-muted)' }}>
          {BRAND} · {CONTACT_ADDRESS} · {CONTACT_PHONE}
        </div>
      </div>
    </div>
  );
}
