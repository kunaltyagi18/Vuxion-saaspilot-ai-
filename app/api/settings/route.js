import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { isAdminUser } from "@/lib/adminGuard";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();
    // Always return one document — create with defaults if missing
    let settings = await SiteSettings.findOne();
    if (!settings) settings = await SiteSettings.create({});
    return NextResponse.json(settings);
  } catch (err) {
    console.error("GET /api/settings failed:", err);
    return NextResponse.json({});
  }
}

export async function PUT(req) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  const body = await req.json();
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create(body);
  } else {
    // Deep merge — only update fields sent. Keep the arrays in sync with the
    // public WhyUs component so admin edits are not silently discarded.
    if (body.hero)    Object.assign(settings.hero,    body.hero);
    if (body.cta)     Object.assign(settings.cta,     body.cta);
    if (body.contact) Object.assign(settings.contact, body.contact);
    if (Array.isArray(body.techStack)) settings.techStack = body.techStack;
    if (Array.isArray(body.whyUs))     settings.whyUs = body.whyUs;
    await settings.save();
  }
  return NextResponse.json(settings);
}
