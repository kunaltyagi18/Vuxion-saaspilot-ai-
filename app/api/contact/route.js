import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/adminGuard";
import { checkRateLimit } from "@/lib/ratelimit";
import { sendMail, userConfirmationEmail, adminAlertEmail } from "@/lib/mailer";

// GET - fetch all leads (ADMIN ONLY)
export async function GET() {
  const isAdmin = await isAdminUser();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const leads = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(Array.isArray(leads) ? leads : []);
  } catch (err) {
    console.error("GET /api/contact failed:", err);
    return NextResponse.json({ error: "Leads fetch nahi ho paaye" }, { status: 500 });
  }
}

// POST - public endpoint to submit contact form
export async function POST(request) {
  // ── Rate Limiting: max 5 submissions per IP per minute ──────────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";

  const rateCheck = checkRateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rateCheck.ok) {
    return NextResponse.json({ error: rateCheck.message }, { status: 429 });
  }
  // ────────────────────────────────────────────────────────────────────────────

  try {
    await connectDB();
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Saare fields fill karo" }, { status: 400 });
    }

    // Save to MongoDB
    const contact = await Contact.create({ name, email, message });

    // ── Send emails (non-blocking — failures don't affect the user response) ──
    const adminEmail = process.env.GMAIL_USER; // Admin ka email = sender email

    // Fire-and-forget — await nahi karte taaki response fast rahe
    Promise.allSettled([
      // 1. User ko auto-reply
      sendMail({
        to: email,
        subject: "We received your message! — Vuxion",
        html: userConfirmationEmail({ name }),
      }),
      // 2. Admin ko alert
      adminEmail &&
        sendMail({
          to: adminEmail,
          subject: `🔔 New Lead: ${name} (${email})`,
          html: adminAlertEmail({ name, email, message }),
        }),
    ]).catch((err) => console.error("Email send error:", err));
    // ────────────────────────────────────────────────────────────────────────

    return NextResponse.json(contact, { status: 201 });
  } catch (err) {
    console.error("POST /api/contact failed:", err);
    return NextResponse.json({ error: "Message send nahi hua" }, { status: 500 });
  }
}
