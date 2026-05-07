import { createCipheriv, createHash, randomBytes } from "node:crypto";

const [, , rawKey, rawValue] = process.argv;

if (!rawKey || !rawValue) {
    process.exit(1);
}

const key = createHash("sha256").update(rawKey).digest();
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const ciphertext = Buffer.concat([cipher.update(rawValue, "utf8"), cipher.final()]);
const authTag = cipher.getAuthTag();
const encode = (buffer) => buffer.toString("base64url");

process.stdout.write(`${encode(iv)}.${encode(authTag)}.${encode(ciphertext)}\n`);
