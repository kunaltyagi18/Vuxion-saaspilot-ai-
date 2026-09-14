// lib/adminGuard.js
// ── Server-side Admin Verification Utility ───────────────────────────────────
// Ye helper function API route handlers mein use hota hai.
// Ye check karta hai ki current request karne wala user admin hai ya nahi.
//
// NOTE: Ye Node.js runtime pe run karta hai (API routes), Edge runtime pe nahi.
// Middleware ke liye alag approach use hoti hai (clerkClient direct call).

import { currentUser } from "@clerk/nextjs/server";
import { ADMIN_EMAIL } from "@/lib/config";

/**
 * Check karta hai ki current logged-in user admin hai ya nahi.
 * @returns {Promise<boolean>} — true agar admin, false agar nahi ya logged out
 */
export async function isAdminUser() {
  // currentUser() Clerk se current session ka user fetch karta hai
  const user = await currentUser();

  // Logged in hi nahi hai
  if (!user) return false;

  // Primary email address nikalo
  const email = user.emailAddresses?.find(
    (e) => e.id === user.primaryEmailAddressId
  )?.emailAddress;

  // Admin email se compare karo
  return email === ADMIN_EMAIL;
}
