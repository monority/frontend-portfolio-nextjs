export const MESSAGING_RESUME_COOKIE_NAME = "portfolio-messaging-resume";
export const MESSAGING_RESUME_STORAGE_KEY = "portfolio.messaging.resume";
export const MESSAGING_PREVIEW_MAX_LENGTH = 96;

export function normalizeMessagingUsername(username: string) {
	return username.trim().replace(/\s+/g, " ");
}

export function normalizeMessagingBody(body: string) {
	return body.trim().replace(/\s+/g, " ");
}

export function getMessagingPreview(body: string, maxLength = MESSAGING_PREVIEW_MAX_LENGTH) {
	const normalized = normalizeMessagingBody(body);

	if (normalized.length <= maxLength) {
		return normalized;
	}

	if (maxLength <= 3) {
		return normalized.slice(0, maxLength);
	}

	return `${normalized.slice(0, maxLength - 3).trimEnd()}...`;
}

export function createMessagingResumeToken() {
	return `${crypto.randomUUID().replace(/-/g, "")}${crypto.randomUUID().replace(/-/g, "")}`;
}

export async function hashMessagingResumeToken(token: string) {
	const encoded = new TextEncoder().encode(token);
	const digest = await crypto.subtle.digest("SHA-256", encoded);

	return Array.from(new Uint8Array(digest))
		.map((value) => value.toString(16).padStart(2, "0"))
		.join("");
}
