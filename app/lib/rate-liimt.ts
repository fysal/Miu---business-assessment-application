import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 registrations per hour per IP
  analytics: true,
});

// Fallback in-memory rate limiter for development
const inMemoryStore = new Map();

export async function simpleRateLimit(
  ip: string,
  limit = 3,
  windowMs = 3600000,
) {
  const now = Date.now();
  const key = `rate:${ip}`;

  const requests = inMemoryStore.get(key) || [];
  const validRequests = requests.filter((ts: number) => now - ts < windowMs);

  if (validRequests.length >= limit) {
    return { success: false, limit, remaining: 0 };
  }

  validRequests.push(now);
  inMemoryStore.set(key, validRequests);

  return { success: true, limit, remaining: limit - validRequests.length };
}
