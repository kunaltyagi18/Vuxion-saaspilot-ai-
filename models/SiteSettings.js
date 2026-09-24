import mongoose from "mongoose";

// SiteSettings — single document (upserted), stores all editable site-wide content
const SiteSettingsSchema = new mongoose.Schema({
  // Hero section
  hero: {
    badge:    { type: String, default: "Building next-gen digital products" },
    headline: { type: String, default: "We Craft Immersive Digital Experiences" },
    subtitle: { type: String, default: "Full-stack web development, stunning UI/UX design & SEO — engineered to be fast, scalable, and built for growth." },
    cta1Text: { type: String, default: "Explore Our Work" },
    cta2Text: { type: String, default: "Start a Project" },
    stat1Value: { type: String, default: "50+" },
    stat1Label: { type: String, default: "Projects Delivered" },
    stat2Value: { type: String, default: "30+" },
    stat2Label: { type: String, default: "Happy Clients" },
    stat3Value: { type: String, default: "5+" },
    stat3Label: { type: String, default: "Years Experience" },
  },
  // CTA section
  cta: {
    badge:    { type: String, default: "Available for new projects" },
    headline: { type: String, default: "Ready to Build Something Extraordinary?" },
    subtitle: { type: String, default: "From concept to launch — we turn your vision into a high-performance digital product. Let's have a 15-minute discovery call, no obligations." },
    trust1:   { type: String, default: "✓ Free discovery call" },
    trust2:   { type: String, default: "✓ Fixed-price quotes" },
    trust3:   { type: String, default: "✓ 30-day support included" },
  },
  // Footer / Contact info
  contact: {
    email:    { type: String, default: "hello@vuxion.com" },
    phone:    { type: String, default: "+91 74280 XXXXX" },
    address:  { type: String, default: "Vuxion, Noida, India" },
    githubUrl:    { type: String, default: "https://github.com" },
    twitterUrl:   { type: String, default: "https://twitter.com" },
    linkedinUrl:  { type: String, default: "https://linkedin.com" },
    instagramUrl: { type: String, default: "https://instagram.com" },
  },
}, { timestamps: true });

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
