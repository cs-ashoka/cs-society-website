// Receives CS Query submissions (office-hours bookings and doubts) and emails them to the society.
// Sends through Resend's HTTP API, so no extra package is needed.
//
// Env vars:
//   RESEND_API_KEY   required. Create one at resend.com.
//   CS_QUERY_TO      inbox that gets the queries. Defaults to cs.society@ashoka.edu.in.
//                    Comma-separate to send to several people.
//   CS_QUERY_FROM    sender address on a domain verified in Resend,
//                    e.g. "CS Query <query@yourdomain.com>". Defaults to Resend's test sender,
//                    which only delivers to the Resend account owner's email.

export const dynamic = "force-dynamic";

const DEFAULT_TO = "cs.society@ashoka.edu.in";
const DEFAULT_FROM = "CS Query <onboarding@resend.dev>";

const TYPES = { office_hours: "Office hours booking", doubt: "Doubt" } as const;

const LIMITS = { name: 100, email: 200, topic: 150, slots: 300, message: 4000 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const type = body.type === "office_hours" ? "office_hours" : body.type === "doubt" ? "doubt" : null;
  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const topic = clean(body.topic, LIMITS.topic);
  const slots = clean(body.slots, LIMITS.slots);
  const message = clean(body.message, LIMITS.message);

  if (!type || !name || !email || !topic || !message) {
    return Response.json({ error: "Please fill in all the required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email doesn't look right." }, { status: 400 });
  }
  if (type === "office_hours" && !slots) {
    return Response.json({ error: "Tell us when you're free for office hours." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("cs-query: RESEND_API_KEY is not set");
    return Response.json(
      { error: `Queries aren't set up yet. Email us at ${DEFAULT_TO} instead.` },
      { status: 503 }
    );
  }

  const to = (process.env.CS_QUERY_TO || DEFAULT_TO).split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.CS_QUERY_FROM || DEFAULT_FROM;
  const label = TYPES[type];

  const rows: [string, string][] = [
    ["Type", label],
    ["Name", name],
    ["Email", email],
    ["Topic", topic],
    ...(type === "office_hours" ? ([["Availability", slots]] as [string, string][]) : []),
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:14px;color:#111">
      <h2 style="margin:0 0 12px">${escapeHtml(label)}: ${escapeHtml(topic)}</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="color:#666;vertical-align:top">${k}</td><td>${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="color:#666;margin:16px 0 4px">Message</p>
      <div style="white-space:pre-wrap;border-left:3px solid #ddd;padding-left:12px">${escapeHtml(message)}</div>
      <p style="color:#999;font-size:12px;margin-top:20px">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    </div>`;

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", message].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `[CS Query] ${label}: ${topic}`,
        html,
        text,
      }),
    });
    if (!res.ok) {
      console.error("cs-query: Resend error", res.status, await res.text());
      return Response.json({ error: "Couldn't send right now. Try again in a bit." }, { status: 502 });
    }
  } catch (err) {
    console.error("cs-query: send failed", err);
    return Response.json({ error: "Couldn't send right now. Try again in a bit." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
