import connectDB from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/adminGuard";

// DELETE - FAQ hatao (ADMIN ONLY)
export async function DELETE(request, { params }) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    await connectDB();
    const { id } = await params;
    await FAQ.findByIdAndDelete(id);
    return NextResponse.json({ message: "FAQ delete ho gaya" });
  } catch (err) {
    return NextResponse.json({ error: "Delete nahi hua" }, { status: 500 });
  }
}

// PUT - FAQ update karo (ADMIN ONLY)
export async function PUT(request, { params }) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const updated = await FAQ.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "Update nahi hua" }, { status: 500 });
  }
}