/**
 * AI Service — Feature-flagged OpenAI integration
 *
 * All AI features in this file. When OPENAI_API_KEY is not set (or
 * aiEnabled = false in Settings), all functions return template-based fallbacks.
 *
 * Usage:
 *   const draft = await generateQuoteReply({ ... });
 *   const reply = await generateInquiryReply({ ... });
 *   const contractNotes = await generateContractScope({ ... });
 *
 * Features:
 *   · AI-suggested reply to quote requests
 *   · AI-assisted contract scope/notes
 *   · AI draft for inquiry replies
 */

import { db } from '@/lib/db';
import { BRAND, REGION, CONTACT_PHONE } from '@/app/brand';

// Lazy-load OpenAI so the app starts fine without the package installed
async function getOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;

  try {
    // Check DB setting
    const settings = await db.settings.findFirst();
    if (!settings?.aiEnabled) return null;

    const { default: OpenAI } = await import('openai');
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  } catch {
    return null;
  }
}

const SYSTEM_PROMPT = `You are a professional customer service representative for ${BRAND},
a home renovation marketplace connecting homeowners with verified local pros in ${REGION}.
Tone: warm, knowledgeable, professional.
Always sign off as "The ${BRAND} Team" and mention the phone number ${CONTACT_PHONE} if the customer may need to call.
Keep responses concise — 3-5 short paragraphs maximum.`;

// ─── Generate a suggested reply to a new quote request ───────────────────────
export async function generateQuoteReply({
  customerName,
  city,
  service,
  species,
  squareFeet,
  notes,
}: {
  customerName: string;
  city?: string;
  service?: string;
  species?: string[];
  squareFeet?: number;
  notes?: string;
}): Promise<string> {
  const openai = await getOpenAI();

  if (!openai) {
    // Template fallback
    return `Hi ${customerName},

Thank you for reaching out to ${BRAND}! We'd love to help with your ${service ?? 'renovation'} project${city ? ` in ${city}` : ''}.

A project coordinator will be in touch within 1 business day to schedule a free, no-obligation in-home consultation with one of our verified local pros.

In the meantime, please don't hesitate to call us at ${CONTACT_PHONE} if you have any questions.

Warm regards,
The ${BRAND} Team`;
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Draft a warm, professional reply to a new quote request from ${customerName}.
Details: Service: ${service ?? 'general inquiry'} · Location: ${city ?? REGION} · Materials/species interest: ${species?.join(', ') ?? 'not specified'} · Approx sq ft: ${squareFeet ?? 'not specified'}
Customer notes: "${notes ?? 'None'}"
Keep it under 150 words. Don't mention specific pricing.`,
      },
    ],
    max_tokens: 300,
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content ?? 'Thank you for your inquiry. Our team will be in touch shortly.';
}

// ─── Generate a reply to a general inquiry ───────────────────────────────────
export async function generateInquiryReply({
  subject,
  customerName,
  message,
}: {
  subject: string;
  customerName: string;
  message?: string;
}): Promise<string> {
  const openai = await getOpenAI();

  if (!openai) {
    return `Hi ${customerName},

Thank you for your message regarding "${subject}".

Our team is reviewing your inquiry and will provide a detailed response shortly. If you need to speak with someone immediately, please call us at ${CONTACT_PHONE}.

Best regards,
The ${BRAND} Team`;
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Draft a helpful reply to this customer inquiry.
Subject: "${subject}"
Customer name: ${customerName}
${message ? `Their message: "${message}"` : ''}
Keep it under 200 words. Be specific and helpful.`,
      },
    ],
    max_tokens: 400,
    temperature: 0.65,
  });

  return completion.choices[0]?.message?.content ?? `Hi ${customerName},\n\nThank you for your inquiry. We'll be in touch shortly.\n\nThe ${BRAND} Team`;
}

// ─── Generate contract scope / description ───────────────────────────────────
export async function generateContractScope({
  title,
  service,
  species,
  squareFeet,
  city,
}: {
  title: string;
  service?: string;
  species?: string[];
  squareFeet?: number;
  city?: string;
}): Promise<string> {
  const openai = await getOpenAI();

  if (!openai) {
    return `Professional renovation services for ${title}.
${service ? `Service type: ${service}.` : ''}
${species?.length ? `Materials: ${species.join(', ')}.` : ''}
${squareFeet ? `Approximate area: ${squareFeet.toLocaleString()} sq ft.` : ''}

All work performed by ${BRAND}'s verified local pros. Includes site preparation, installation/finishing, and clean-up.`;
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a professional renovation contractor writing a scope of work section for a client contract.' },
      {
        role: 'user',
        content: `Write a professional, concise scope of work (2-3 paragraphs) for this renovation project:
Title: ${title}
Location: ${city ?? REGION}
Service: ${service ?? 'home renovation'}
Materials: ${species?.join(', ') ?? 'TBD'}
Area: ${squareFeet ? `${squareFeet.toLocaleString()} sq ft` : 'TBD'}
Include professional standards like site prep, acclimation/curing where relevant, and warranty.`,
      },
    ],
    max_tokens: 400,
    temperature: 0.5,
  });

  return completion.choices[0]?.message?.content ?? `Scope of work for ${title}.`;
}

// ─── RenoHub customer-facing chat (Claude) ───────────────────────────────────
export const RENOHUB_CHAT_PROMPT = `You are the ${BRAND} assistant — a concierge for a home-renovation MARKETPLACE in ${REGION} that connects homeowners with verified local pros and material suppliers.

VOICE: warm, knowledgeable, professional, concise. Canadian English.

WHAT YOU DO: help a homeowner describe their renovation project, then capture it as a job lead so verified local pros can reach out. You are NOT a single contractor and you do NOT give price quotes or book site visits.

HARD RULES:
- NEVER invent prices, timelines, pro names, or availability. If asked for a price, explain matched pros provide quotes after reviewing the job.
- NEVER claim a specific pro is available or verified for their job — say verified pros in their area will respond.
- Only state contact facts (phone ${CONTACT_PHONE}) when relevant.

FLOW:
1. Understand the renovation: project type, city, rough scope, timeline, budget if offered. One or two questions at a time.
2. When you have at least projectType + city + name + email (phone preferred), call capture_job_lead.
3. Confirm: their job is posted and verified ${REGION} pros will reach out, usually within 1 business day.

Be helpful, not pushy. End every turn with one clear next step.`;
