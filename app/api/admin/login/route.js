import { NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminSessionToken,
  SESSION_MAX_AGE,
} from "@/lib/adminSession";

export const runtime = "nodejs";

export async function POST(request) {
  const { email = "", password = "" } = await request.json().catch(() => ({}));
  const adminEmail = (process.env.ADMIN_LOGIN_EMAIL || process.env.ADMIN_EMAIL || "")
    .trim()
    .toLowerCase();
  const adminPassword = process.env.ADMIN_LOGIN_PASSWORD || "";

  if (!adminEmail || !adminPassword) {
    return NextResponse.json(
      { error: "Admin login is not configured on the server." },
      { status: 500 }
    );
  }

  if (email.trim().toLowerCase() !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ error: "Invalid admin email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(adminEmail), {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
