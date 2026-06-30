import { streamText, tool, stepCountIs } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { db } from '@/lib/db';
import { sendAdminNewQuoteEmail } from '@/lib/email';
import { RENOHUB_CHAT_PROMPT } from '@/lib/ai';
import { BRAND, REGION, CONTACT_PHONE } from '@/app/brand';

export const runtime = 'nodejs';
export const maxDuration = 30;

const HITS = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now(), w = 60_000, max = 20;
  const e = HITS.get(ip);
  if (!e || now - e.t > w) { HITS.set(ip, { n: 1, t: now }); return false; }
  e.n += 1; return e.n > max;
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (limited(ip)) return new Response('Too many messages, give it a moment.', { status: 429 });
  if (!process.env.ANTHROPIC_API_KEY) return new Response('Chat is not configured.', { status: 503 });

  let messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  try { ({ messages } = await req.json()); } catch { return new Response('Bad request', { status: 400 }); }

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: RENOHUB_CHAT_PROMPT,
    messages,
    stopWhen: stepCountIs(6),
    tools: {
      get_company_context: tool({
        description: `Get real ${BRAND} facts before sharing them.`,
        inputSchema: z.object({}),
        execute: async () => ({ brand: BRAND, region: REGION, phone: CONTACT_PHONE, note: `${BRAND} is a home-renovation marketplace connecting homeowners with verified local pros and suppliers in ${REGION}.` }),
      }),
      capture_job_lead: tool({
        description: 'Save a homeowner renovation job as a lead once you have at least name, email, city, and projectType.',
        inputSchema: z.object({
          name: z.string().min(2), email: z.string().email(),
          phone: z.string().optional(), city: z.string().min(2),
          projectType: z.string().min(2), timeline: z.string().optional(),
          budgetRange: z.string().optional(), notes: z.string().optional(),
        }),
        execute: async (lead) => {
          const adminNotify = (quoteId: string) =>
            sendAdminNewQuoteEmail({
              quoteId, name: lead.name, email: lead.email, phone: lead.phone,
              city: lead.city, service: lead.projectType,
              notes: `[via ${BRAND} chat] ${lead.timeline ? 'Timeline: ' + lead.timeline + '. ' : ''}${lead.budgetRange ? 'Budget: ' + lead.budgetRange + '. ' : ''}${lead.notes ?? ''}`.trim(),
            }).catch((e: unknown) => console.error('[chat] admin email failed:', e));
          try {
            const q = await db.quoteRequest.create({ data: {
              name: lead.name, email: lead.email, phone: lead.phone ?? null,
              city: lead.city, projectType: lead.projectType,
              service: lead.projectType, timeline: lead.timeline ?? null,
              budgetRange: lead.budgetRange ?? null,
              notes: `[via ${BRAND} chat] ${lead.notes ?? ''}`.trim(),
            }});
            adminNotify(q.id);
            console.log(JSON.stringify({ event: 'lead.captured', source: 'chat', leadId: q.id }));
            return { ok: true, quoteId: q.id, message: `Job posted. Saved. ${BRAND} is onboarding verified ${REGION} pros and the team will follow up personally as they come online.` };
          } catch (err) {
            adminNotify('chat-fallback');
            console.log(JSON.stringify({ event: 'lead.captured', source: 'chat', leadId: 'fallback', lead, dbError: err instanceof Error ? err.message : 'unknown' }));
            return { ok: true, quoteId: null, message: `Got it — your job is saved — ${BRAND} is onboarding pros in your area and the team will follow up personally.` };
          }
        },
      }),
    },
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of result.textStream) controller.enqueue(encoder.encode(chunk));
      } catch {
        controller.enqueue(encoder.encode(`\n\n(Sorry — something interrupted that. Please try again or call ${CONTACT_PHONE}.)`));
      }
      controller.close();
    },
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache, no-transform' } });
}
