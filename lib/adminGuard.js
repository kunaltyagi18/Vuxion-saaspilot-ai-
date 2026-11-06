import { hasAdminSession } from "@/lib/adminSession";

export async function isAdminUser() {
  return hasAdminSession();
}
