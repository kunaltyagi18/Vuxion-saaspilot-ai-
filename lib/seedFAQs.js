import connectDB from "./mongodb.js";
import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
  keywords: [String],
  answer: String,
});

const FAQ = mongoose.models.FAQ || mongoose.model("FAQ", FAQSchema);

const faqs = [
  {
    keywords: ["service", "services", "offer", "provide", "kya", "what"],
    answer: "We offer Web Development, UI/UX Design, and SEO Optimization. Type 'pricing' to know more about costs!",
  },
  {
    keywords: ["price", "pricing", "cost", "kitna", "charge", "fees", "rate"],
    answer: "Web Development starts at Rs. 15,000 | UI/UX Design starts at Rs. 8,000 | SEO starts at Rs. 5,000. Contact us for a custom quote!",
  },
  {
    keywords: ["contact", "reach", "email", "call", "phone", "touch"],
    answer: "You can reach us at hello@myagency.com or fill the contact form on our website. We reply within 24 hours!",
  },
  {
    keywords: ["timing", "time", "hours", "open", "available", "schedule"],
    answer: "We are available Monday to Saturday, 10 AM to 7 PM IST. Sunday we are closed.",
  },
  {
    keywords: ["project", "projects", "work", "portfolio", "built", "made"],
    answer: "We have worked on E-commerce stores, SaaS dashboards, and portfolio websites. Check the Projects section above!",
  },
  {
    keywords: ["location", "address", "where", "office", "based"],
    answer: "We are based in Delhi, India. We work with clients remotely across India and worldwide.",
  },
  {
    keywords: ["hello", "hi", "hey", "hii", "helo", "namaste"],
    answer: "Hello! 👋 How can I help you today? You can ask about our services, pricing, timings, or projects!",
  },
];

async function seedData() {
  await connectDB();
  await FAQ.deleteMany({}); // pehle wale hata do
  await FAQ.insertMany(faqs);
  console.log("FAQs seed ho gaye!");
  process.exit(0);
}

seedData();