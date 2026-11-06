import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { isAdminUser } from "@/lib/adminGuard";

export async function PUT(req, { params }) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const t = await Testimonial.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(t);
}

export async function DELETE(req, { params }) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  const { id } = await params;
  await Testimonial.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
