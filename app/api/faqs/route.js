import connectDB from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/adminGuard";

// GET - saare FAQs fetch karo (PUBLIC — chatbot isse use karta hai)
export async function GET() {
  try {
    await connectDB();
    const faqs = await FAQ.find({});
    return NextResponse.json(faqs);
  } catch (err) {
    return NextResponse.json({ error: "FAQs nahi mile" }, { status: 500 });
  }
}

// POST - naya FAQ add karo (ADMIN ONLY)
export async function POST(request) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const faq = await FAQ.create(body);
    return NextResponse.json(faq, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "FAQ add nahi hua" }, { status: 500 });
  }
}