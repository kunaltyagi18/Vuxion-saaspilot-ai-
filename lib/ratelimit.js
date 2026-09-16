/**
 * lib/ratelimit.js
 * In-memory rate limiter — no external service required.
 * Limitation: Resets on server restart / doesn't share state across
 * multiple Vercel instances, but perfectly fine for a portfolio project.
 *
 * Usage:
 *   const result = checkRateLimit(ip, { limit: 5, windowMs: 60_000 });
 *   if (!result.ok) return NextResponse.json({ error: result.message }, { status: 429 });
 */

// Map: ip → { count, resetAt }
const store = new Map();

/**
 * @param {string} key     - Unique identifier (IP address)
 * @param {{ limit: number, windowMs: number }} options
 * @returns {{ ok: boolean, remaining: number, message?: string }}
 */
export function checkRateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();

  // Cleanup expired entries to prevent memory leak
  for (const [k, v] of store.entries()) {
    if (now > v.resetAt) store.delete(k);
  }

  const entry = store.get(key);

  // First request from this IP — create entry
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  // Increment count
  entry.count += 1;
  store.set(key, entry);

  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return {
      ok: false,
      remaining: 0,
      message: `Too many requests. Please wait ${retryAfter} seconds before trying again.`,
    };
  }

  return { ok: true, remaining: limit - entry.count };
}
