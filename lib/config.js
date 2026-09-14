// lib/config.js
// ── Shared Configuration ──────────────────────────────────────────────────────
// Ye file saari app mein common constants rakhti hai.
// Agar future mein admin email change karni ho, sirf yahan ek jagah change karo.

// Sirf is email wala user admin routes aur API mutations access kar sakta hai.
// NEXT_PUBLIC_ADMIN_EMAIL → client components (Navbar, admin page) ke liye
// ADMIN_EMAIL             → server-side (adminGuard.js, API routes) ke liye
export const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL;

// ── Site URL (SEO) ────────────────────────────────────────────────────────────
// robots.js, sitemap.js aur layout.js — teeno isi ek constant ko use karte hain.
// Deploy karte waqt sirf .env.local / hosting env vars me NEXT_PUBLIC_SITE_URL
// set karo — code me kahin bhi domain hardcode karne ki zaroorat nahi.
// Local dev me fallback "http://localhost:3000" rahega agar env var missing ho.
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";