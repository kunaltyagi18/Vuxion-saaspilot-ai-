import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/adminGuard";

export async function DELETE(request, { params }) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { id } = await params; // Make sure to await params if Next.js 14 requires it, wait, next.js 14 params can be destructured directly, but let's do it safely
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ message: "Lead deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/contact/[id] failed:", err);
    return NextResponse.json({ error: "Lead delete nahi hua" }, { status: 500 });
  }
}
