import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

const SEED = [
  { category: "Web Development", title: "10 Next.js Performance Tricks That Will Blow Your Mind", excerpt: "From ISR to image optimization, these battle-tested techniques can cut your page load time by up to 70%.", readTime: "5 min read", date: "Sep 2025", emoji: "⚡", color: "from-indigo-500 to-violet-500", order: 1 },
  { category: "UI/UX Design",    title: "Why Your Website's First 3 Seconds Are Everything",        excerpt: "The science behind first impressions and how to design hero sections that instantly convert visitors into leads.", readTime: "4 min read", date: "Aug 2025", emoji: "🎨", color: "from-violet-500 to-fuchsia-500", order: 2 },
  { category: "SEO",             title: "The Complete 2025 SEO Checklist for New Websites",         excerpt: "A practical, no-fluff guide to ranking on Page 1 — from technical SEO to content strategy that actually works.", readTime: "7 min read", date: "Jul 2025", emoji: "📈", color: "from-fuchsia-500 to-pink-500", order: 3 },
];

export async function GET() {
  await connectDB();
  let posts = await BlogPost.find({ active: true }).sort({ order: 1 });
  if (posts.length === 0) {
    await BlogPost.insertMany(SEED);
    posts = await BlogPost.find({ active: true }).sort({ order: 1 });
  }
  return NextResponse.json(posts);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const post = await BlogPost.create(body);
  return NextResponse.json(post, { status: 201 });
}
