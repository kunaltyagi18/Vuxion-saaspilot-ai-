import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/adminGuard";

// GET - saare projects fetch karo (PUBLIC — homepage isse use karta hai)
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find({});
    // hamesha array return karo — frontend ko defensive banane ke liye
    return NextResponse.json(Array.isArray(projects) ? projects : []);
  } catch (err) {
    console.error("GET /api/projects failed:", err);
    return NextResponse.json(
      {
        error: "Projects fetch nahi ho paaye",
        hint: err?.message ?? String(err),
      },
      { status: 500 }
    );
  }
}

// POST - naya project add karo (ADMIN ONLY)
export async function POST(request) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Project add nahi hua" }, { status: 500 });
  }
}