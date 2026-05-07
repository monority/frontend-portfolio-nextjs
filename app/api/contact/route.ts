import { createDecipheriv, createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { serverEnv } from "../../../env.server";

export const runtime = "nodejs";

type ContactKind = "email" | "phone";

const encryptedByKind: Record<ContactKind, string | undefined> = {
    email: serverEnv.CONTACT_EMAIL_ENCRYPTED,
    phone: serverEnv.CONTACT_PHONE_ENCRYPTED,
};

function normalizeBase64(value: string) {
    return value.replace(/-/g, "+").replace(/_/g, "/");
}

function decodeBase64(value: string) {
    return Buffer.from(normalizeBase64(value), "base64");
}

function getEncryptionKey(rawKey: string) {
    return createHash("sha256").update(rawKey).digest();
}

function decryptContactValue(encryptedValue: string, rawKey: string) {
    const [ivValue, authTagValue, ciphertextValue] = encryptedValue.split(".");

    if (!ivValue || !authTagValue || !ciphertextValue) {
        throw new Error("Invalid encrypted contact format");
    }

    const decipher = createDecipheriv("aes-256-gcm", getEncryptionKey(rawKey), decodeBase64(ivValue));
    decipher.setAuthTag(decodeBase64(authTagValue));

    return Buffer.concat([
        decipher.update(decodeBase64(ciphertextValue)),
        decipher.final(),
    ]).toString("utf8");
}

function isContactKind(value: string | null): value is ContactKind {
    return value === "email" || value === "phone";
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const kind = searchParams.get("type");

    if (!isContactKind(kind)) {
        return NextResponse.json({ error: "Invalid contact type" }, { status: 400 });
    }

    const encryptedValue = encryptedByKind[kind];
    const key = serverEnv.CONTACT_CRYPTO_KEY;

    if (!encryptedValue || !key) {
        return NextResponse.json({ error: "Contact unavailable" }, { status: 503 });
    }

    try {
        const value = decryptContactValue(encryptedValue, key);

        return NextResponse.json(
            { type: kind, value },
            { headers: { "Cache-Control": "no-store" } },
        );
    } catch {
        return NextResponse.json({ error: "Contact unavailable" }, { status: 503 });
    }
}
