import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/adminGuard";

// DELETE - service hatao (ADMIN ONLY)
export async function DELETE(request, { params }) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    await connectDB();
    const { id } = await params;
    await Service.findByIdAndDelete(id);
    return NextResponse.json({ message: "Service delete ho gayi" });
  } catch (err) {
    return NextResponse.json({ error: "Delete nahi hua" }, { status: 500 });
  }
}