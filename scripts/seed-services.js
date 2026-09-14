// scripts/seed-services.js
// Dummy services + images MongoDB me daalne ka script.
// Usage: node scripts/seed-services.js
//           node scripts/seed-services.js --reset    (pehle purane services delete karke seed karega)

// .env.local load karo (Next.js automatic karta hai, plain Node script me manually karna padta hai)
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = val;
  }
}

import mongoose from "mongoose";
import connectDB from "../lib/mongodb.js";
import Service from "../models/Service.js";

const dummyServices = [
  {
    title: "Web Development",
    description:
      "Lightning-fast, SEO-friendly websites built with Next.js and modern stacks — from landing pages to complex web apps.",
    price: "Starting at ₹15,000",
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "UI / UX Design",
    description:
      "Beautiful, conversion-focused interfaces designed in Figma — wireframes, prototypes, and full design systems.",
    price: "Starting at ₹10,000",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "SEO Optimization",
    description:
      "Rank higher on Google with technical SEO audits, keyword research, content strategy, and backlink building.",
    price: "Starting at ₹8,000 / mo",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform iOS and Android apps using React Native and Flutter — smooth, native-feeling experiences.",
    price: "Starting at ₹25,000",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cloud & DevOps",
    description:
      "AWS / Azure deployment, CI/CD pipelines, monitoring, and cost optimization — production-ready from day one.",
    price: "Starting at ₹12,000",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "AI & Chatbot Integration",
    description:
      "Custom GPT-powered chatbots, automation workflows, and AI features integrated directly into your product.",
    price: "Starting at ₹20,000",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  },
];

async function run() {
  const shouldReset = process.argv.includes("--reset");

  try {
    console.log("🔌 Connecting to MongoDB...");
    await connectDB();

    if (shouldReset) {
      const deleted = await Service.deleteMany({});
      console.log(`🗑️  Cleared ${deleted.deletedCount} existing services.`);
    }

    const existing = await Service.countDocuments();
    if (existing > 0 && !shouldReset) {
      console.log(
        `⚠️  Database already has ${existing} services. Use --reset to wipe and reseed.`
      );
      process.exit(0);
    }

    const inserted = await Service.insertMany(dummyServices);
    console.log(`✅ Inserted ${inserted.length} services:`);
    inserted.forEach((s) =>
      console.log(`   • ${s.title}  →  ${s.image}`)
    );
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected.");
  }
}

run();