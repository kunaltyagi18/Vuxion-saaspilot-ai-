import connectDB from "@/lib/mongodb";
import About from "@/models/About";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/adminGuard";

// GET — Public: fetch about content (creates default if none exists)
export async function GET() {
  try {
    await connectDB();
    let about = await About.findOne();
    if (!about) {
      // First time: create with default values
      about = await About.create({});
    }
    return NextResponse.json(about);
  } catch (err) {
    return NextResponse.json({ error: "Fetch nahi hua" }, { status: 500 });
  }
}

// PUT — Admin only: update about content
export async function PUT(request) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    await connectDB();
    const body = await request.json();
    let about = await About.findOne();
    if (!about) {
      about = await About.create(body);
    } else {
      about = await About.findByIdAndUpdate(about._id, body, { new: true });
    }
    return NextResponse.json(about);
  } catch (err) {
    return NextResponse.json({ error: "Update nahi hua" }, { status: 500 });
  }
}
