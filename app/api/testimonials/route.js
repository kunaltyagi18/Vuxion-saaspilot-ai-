import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

// Seed data if DB empty
const SEED = [
  { name: "Arjun Mehta", role: "CEO, TechStart India", review: "Vuxion transformed our entire digital presence. The website they built for us is fast, beautiful, and has significantly improved our lead generation. Highly recommended!", rating: 5, initials: "AM", color: "bg-indigo-600", order: 1 },
  { name: "Priya Sharma", role: "Founder, StyleBoutique", review: "From design to deployment, the team was professional and delivered exactly what we envisioned. The SEO work alone doubled our organic traffic within 3 months.", rating: 5, initials: "PS", color: "bg-violet-600", order: 2 },
  { name: "Rohan Kapoor", role: "Product Manager, FinEdge", review: "Exceptional attention to detail and communication throughout the project. The admin dashboard they built saves us hours of manual work every week. 10/10!", rating: 5, initials: "RK", color: "bg-purple-600", order: 3 },
  { name: "Sneha Joshi", role: "Marketing Head, GreenEarth NGO", review: "Working with Vuxion was a breeze. They understood our non-profit needs perfectly and delivered a stunning website under budget and ahead of schedule.", rating: 5, initials: "SJ", color: "bg-sky-600", order: 4 },
];

export async function GET() {
  await connectDB();
  let testimonials = await Testimonial.find({ active: true }).sort({ order: 1 });
  if (testimonials.length === 0) {
    await Testimonial.insertMany(SEED);
    testimonials = await Testimonial.find({ active: true }).sort({ order: 1 });
  }
  return NextResponse.json(testimonials);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const t = await Testimonial.create(body);
  return NextResponse.json(t, { status: 201 });
}
