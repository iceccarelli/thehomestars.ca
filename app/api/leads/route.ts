import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

type Lead = Record<string, unknown> & { type: string; receivedAt: string };

// ============================================================================
// saveLead — the ONE place to wire real delivery.
//
// Today: logs the lead (visible in `next dev` / Vercel function logs) and
// appends to data/leads.json for local/persistent-host runs.
//
// Before launch, swap the file write for ONE of:
//   • Email:  await resend.emails.send({ ... })           // npm i resend, set RESEND_API_KEY
//   • DB:     await supabase.from("leads").insert(lead)   // set SUPABASE_URL / KEY
// On Vercel the filesystem is ephemeral, so the JSON file will NOT persist
// across requests in production — treat it as a dev convenience only.
// ============================================================================
async function saveLead(lead: Lead): Promise<void> {
  console.log("[LEAD]", JSON.stringify(lead));
  try {
    const dir = path.join(process.cwd(), "data");
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, "leads.json");
    let existing: Lead[] = [];
    try {
      existing = JSON.parse(await fs.readFile(file, "utf8")) as Lead[];
    } catch {
      // file does not exist yet — start fresh
    }
    existing.push(lead);
    await fs.writeFile(file, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error("[LEAD] persistence failed:", err);
  }
}

const REQUIRED: Record<string, string[]> = {
  job: ["name", "email", "title"],
  pro: ["name", "email", "company"],
  supplier: ["name", "email", "company"],
};

function isEmail(v: unknown): boolean {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const type = String(body.type ?? "").trim();
  if (!Object.keys(REQUIRED).includes(type)) {
    return NextResponse.json({ ok: false, error: "Unknown lead type" }, { status: 400 });
  }

  const missing = REQUIRED[type].filter((f) => !String(body[f] ?? "").trim());
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 },
    );
  }
  if (!isEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 });
  }

  const lead: Lead = { ...body, type, receivedAt: new Date().toISOString() };
  await saveLead(lead);
  return NextResponse.json({ ok: true });
}
