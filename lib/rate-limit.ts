interface RateLimitEntry {
    count: number;
    resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 10;

function getKey(identifier: string): string {
    return `rl:${identifier}`;
}

function cleanExpired(now: number) {
    for (const [key, entry] of store.entries()) {
        if (entry.resetAt <= now) {
            store.delete(key);
        }
    }
}

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfter: number } {
    const now = Date.now();
    const key = getKey(identifier);

    cleanExpired(now);

    const entry = store.get(key);

    if (!entry || entry.resetAt <= now) {
        store.set(key, { count: 1, resetAt: now + WINDOW_MS });
        return { allowed: true, retryAfter: 0 };
    }

    if (entry.count >= MAX_REQUESTS) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        return { allowed: false, retryAfter };
    }

    entry.count += 1;
    return { allowed: true, retryAfter: 0 };
}
