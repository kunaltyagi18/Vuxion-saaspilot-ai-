import connectDB from "./mongodb.js";
import mongoose from "mongoose";

// Schemas define karo agar models load hone me issue ho
const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  image: String,
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  techStack: [String],
  link: String,
  image: String,
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

// 3 Dummy Services
const dummyServices = [
  {
    title: "Full-Stack Web Development",
    description: "Custom fast-loading web applications built with Next.js 14, React, and Tailwind CSS.",
    price: "Starting at ₹25,000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "UI/UX & Mobile App Design",
    description: "Modern intuitive interfaces, wireframes, and interactive prototypes designed for conversion.",
    price: "Starting at ₹12,000",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "SEO & Performance Optimization",
    description: "Rank #1 on Google search result pages with speed audits and keyword targeting strategies.",
    price: "Starting at ₹8,000",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
  },
];

// 3 Dummy Projects
const dummyProjects = [
  {
    title: "AI SaaS Platform",
    description: "An AI-powered content generation dashboard with subscription management and analytics.",
    techStack: ["Next.js 14", "MongoDB", "Tailwind CSS", "Clerk"],
    link: "https://example.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "E-Commerce Fashion Store",
    description: "A full-featured online shop with dynamic product filtering, cart, and payment checkout.",
    techStack: ["React", "Node.js", "Stripe", "MongoDB"],
    link: "https://example.com",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Agency Portfolio Portal",
    description: "An ultra-fast client showreels portal with animated dark mode and interactive AI chatbot.",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    link: "https://example.com",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();

    console.log("Seeding Services...");
    await Service.deleteMany({});
    await Service.insertMany(dummyServices);

    console.log("Seeding Projects...");
    await Project.deleteMany({});
    await Project.insertMany(dummyProjects);

    console.log("Successfully seeded 3 Services and 3 Projects with images!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seed();
