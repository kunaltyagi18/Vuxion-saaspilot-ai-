// middleware.js  ← Project ROOT mein hona chahiye (Next.js sirf yahan dhundta hai)
// ── Admin Route Protection Middleware ────────────────────────────────────────
// Ye middleware do kaam karta hai:
// 1. /admin routes ke liye pehle check karta hai ki user logged in hai ya nahi
// 2. Agar logged in hai, toh Clerk se user ka email fetch karke verify karta hai
//    ki woh ADMIN_EMAIL se match karta hai ya nahi — nahi match kiya toh "/" pe redirect

import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// ADMIN_EMAIL yahan hardcode — middleware Edge runtime mein hai,
// isliye lib/config.js se import karne mein koi issue nahi hoga (pure ESM module)
// lekin agar import fail ho toh backup ke liye yahan bhi define kiya hai
const ADMIN_EMAIL = "tyagikunal1818@gmail.com";

// /admin aur uske saare sub-routes ko protected mark karo
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Sirf admin routes pe extra check lagao
  if (isAdminRoute(req)) {
    // Step 1: User logged in hai ya nahi check karo
    const { userId } = await auth();

    // Agar koi user logged in nahi hai — Clerk sign-in page pe bhej do
    if (!userId) {
      await auth.protect();
      return;
    }

    // Step 2: Ab user logged in hai — uska email fetch karo Clerk se
    // NOTE: Clerk v5+ mein clerkClient() Edge runtime mein bhi kaam karta hai
    // Ye ek extra API call hai, lekin /admin routes pe hi hoga — performance impact minimal
    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);

      // User ka primary email address nikalo
      const userEmail = user.emailAddresses?.find(
        (e) => e.id === user.primaryEmailAddressId
      )?.emailAddress;

      // Agar email admin email se match nahi karti — home page pe bhej do
      if (userEmail !== ADMIN_EMAIL) {
        console.warn(
          `[Admin Guard] Unauthorized: ${userEmail ?? "unknown"} → redirecting to /`
        );
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Email match ho gayi — admin hai, aage jaane do ✅
    } catch (err) {
      // Agar kisi reason se user fetch nahi hua — safe side: redirect karo
      console.error("[Admin Guard] clerkClient.getUser failed:", err);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
