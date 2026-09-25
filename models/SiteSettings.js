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
  // Tech Stack Marquee
  techStack: {
    type: [{ name: String, icon: String }],
    default: [
      { name: "Next.js",      icon: "▲" },
      { name: "React",        icon: "⚛️" },
      { name: "Node.js",      icon: "🟢" },
      { name: "MongoDB",      icon: "🍃" },
      { name: "TypeScript",   icon: "🔷" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Figma",        icon: "🖌️" },
      { name: "PostgreSQL",   icon: "🐘" },
      { name: "AWS",          icon: "☁️" },
      { name: "Docker",       icon: "🐳" },
      { name: "GraphQL",      icon: "◈" },
      { name: "Redis",        icon: "🔴" },
      { name: "Stripe",       icon: "💳" },
      { name: "Vercel",       icon: "▲" },
    ],
  },
  // Why Us features
  whyUs: {
    type: [{ icon: String, title: String, desc: String }],
    default: [
      { icon: "⚡", title: "Lightning Fast",       desc: "Optimised for Core Web Vitals — 90+ Lighthouse scores as standard." },
      { icon: "🎨", title: "Premium Design",       desc: "Every pixel is intentional. We don’t do average." },
      { icon: "🔒", title: "Secure by Default",   desc: "Auth, rate limiting, and encryption built-in from day one." },
      { icon: "📈", title: "SEO Optimised",        desc: "Structured data, meta tags, sitemaps — rank higher from launch." },
      { icon: "🤝", title: "Dedicated Support",   desc: "Slack access, weekly calls, and fast response times throughout." },
      { icon: "💰", title: "Transparent Pricing", desc: "No hidden costs. Fixed quotes. You always know what you’re paying." },
    ],
  },
}, { timestamps: true });

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
