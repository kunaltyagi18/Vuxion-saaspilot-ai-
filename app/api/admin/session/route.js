import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/adminSession";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true });
}
