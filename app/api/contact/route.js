import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/adminGuard";

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
  try {
    await connectDB();
    const body = await request.json();
    const contact = await Contact.create(body);
    return NextResponse.json(contact, { status: 201 });
  } catch (err) {
    console.error("POST /api/contact failed:", err);
    return NextResponse.json({ error: "Message send nahi hua" }, { status: 500 });
  }
}
