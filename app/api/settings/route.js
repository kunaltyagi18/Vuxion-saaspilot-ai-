import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export async function GET() {
  await connectDB();
  // Always return one document — create with defaults if missing
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  return NextResponse.json(settings);
}

export async function PUT(req) {
  await connectDB();
  const body = await req.json();
  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create(body);
  } else {
    // Deep merge — only update fields sent
    if (body.hero)    Object.assign(settings.hero,    body.hero);
    if (body.cta)     Object.assign(settings.cta,     body.cta);
    if (body.contact) Object.assign(settings.contact, body.contact);
    await settings.save();
  }
  return NextResponse.json(settings);
}
