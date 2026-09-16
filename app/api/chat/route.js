import connectDB from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import Service from "@/models/Service";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/ratelimit";

export async function POST(request) {
  // ── Rate Limiting: max 10 chatbot messages per IP per minute ────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "anonymous";

  const rateCheck = checkRateLimit(`chat:${ip}`, { limit: 10, windowMs: 60_000 });
  if (!rateCheck.ok) {
    return NextResponse.json(
      { answer: "⏳ Too many messages! Please wait a moment before sending more." },
      { status: 429 }
    );
  }
  // ────────────────────────────────────────────────────────────────────────────

  try {
    await connectDB();

    const { message } = await request.json();
    const cleanMsg = message.toLowerCase().trim();
    const userWords = cleanMsg.split(/\s+/);

    // ── 1. Smart Intent Check: Greetings (Hi / Hello) ──
    const greetings = ["hi", "hello", "hey", "namaste", "greetings", "good morning", "good evening"];
    if (greetings.some((g) => cleanMsg.startsWith(g) || userWords.includes(g))) {
      return NextResponse.json({
        answer: "Hello! 👋 Welcome to Vuxion! I can help you with information about our Services, Projects, Pricing, and Contact details. What would you like to know?",
      });
    }

    // ── 2. Smart Intent Check: Services & Pricing (Live MongoDB Data) ──
    const serviceKeywords = ["service", "services", "offer", "package", "pricing", "price", "cost", "charge", "rate"];
    if (serviceKeywords.some((k) => cleanMsg.includes(k))) {
      const dbServices = await Service.find({}).lean();
      if (dbServices && dbServices.length > 0) {
        const listText = dbServices
          .map((s) => `• ${s.title}: ${s.description} (${s.price})`)
          .join("\n");
        return NextResponse.json({
          answer: `Here are our current services:\n\n${listText}\n\nFeel free to ask for more details!`,
        });
      }
    }

    // ── 3. Smart Intent Check: Projects & Portfolio (Live MongoDB Data) ──
    const projectKeywords = ["project", "projects", "portfolio", "built", "work done", "examples", "case study"];
    if (projectKeywords.some((k) => cleanMsg.includes(k))) {
      const dbProjects = await Project.find({}).lean();
      if (dbProjects && dbProjects.length > 0) {
        const listText = dbProjects
          .map((p) => `• ${p.title}: Built with ${p.techStack?.join(", ") || "Modern Tech"}`)
          .join("\n");
        return NextResponse.json({
          answer: `Check out some of our latest projects:\n\n${listText}\n\nYou can see full details in the Projects section above!`,
        });
      }
    }

    // ── 4. Smart Intent Check: Contact Info ──
    const contactKeywords = ["contact", "email", "phone", "call", "address", "location", "reach", "number"];
    if (contactKeywords.some((k) => cleanMsg.includes(k))) {
      return NextResponse.json({
        answer: "📞 Phone: +91 74280 XXXXX\n📧 Email: hello@vuxion.com\n📍 Address: Vuxion, Noida, India\n\nYou can also fill out the contact form on this page!",
      });
    }

    // ── 5. MongoDB FAQs keyword matching logic ──
    const allFAQs = await FAQ.find({});
    let bestMatch = null;
    let highestScore = 0;

    for (const faq of allFAQs) {
      let score = 0;
      for (const keyword of faq.keywords) {
        const kLow = keyword.toLowerCase().trim();
        if (userWords.includes(kLow)) score += 2;
        else if (cleanMsg.includes(kLow)) score += 1;
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    }

    if (bestMatch && highestScore > 0) {
      return NextResponse.json({ answer: bestMatch.answer });
    }

    // ── 6. Fallback reply agar context samjh na aaye ──
    return NextResponse.json({
      answer:
        "I'm not completely sure about that. Try asking about our 'services', 'projects', 'pricing', or 'contact'!",
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { answer: "Kuch gadbad ho gayi, thodi der baad try karo!" },
      { status: 500 }
    );
  }
}