import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const t = await Testimonial.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(t);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await Testimonial.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
