import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/adminGuard";

// DELETE - project hatao (ADMIN ONLY)
export async function DELETE(request, { params }) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const { id } = await params;
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project delete ho gaya" });
  } catch (err) {
    return NextResponse.json({ error: "Delete nahi hua" }, { status: 500 });
  }
}