import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/adminGuard";

// GET - saari services fetch karo (PUBLIC — homepage isse use karta hai)
export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({});
    // hamesha array return karo — frontend ko defensive banane ke liye
    return NextResponse.json(Array.isArray(services) ? services : []);
  } catch (err) {
    console.error("GET /api/services failed:", err);
    return NextResponse.json(
      {
        error: "Services fetch nahi ho paayi",
        hint: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}

// POST - nayi service add karo (ADMIN ONLY)
export async function POST(request) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const service = await Service.create(body);
    return NextResponse.json(service, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Service add nahi hui" }, { status: 500 });
  }
}