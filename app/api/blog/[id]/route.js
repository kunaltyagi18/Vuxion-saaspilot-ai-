import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(post);
}

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = await params;
  await BlogPost.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
