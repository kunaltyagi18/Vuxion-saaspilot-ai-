import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { isAdminUser } from "@/lib/adminGuard";

export async function PUT(req, { params }) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const post = await BlogPost.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(post);
}

export async function DELETE(req, { params }) {
  const isAdmin = await isAdminUser();
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await connectDB();
  const { id } = await params;
  await BlogPost.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
