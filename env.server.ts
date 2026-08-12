import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const messagingEnabled = process.env.NEXT_PUBLIC_ENABLE_MESSAGING === "true";

const optionalNonEmptyString = z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().optional(),
);

const encryptedContactValue = z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
        .string()
        .regex(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/, {
            message: "Encrypted contact values must use iv.authTag.ciphertext base64url format",
        })
        .optional(),
);

const supabaseServiceRoleKey = z
    .string()
    .optional()
    .superRefine((value, ctx) => {
        if (!messagingEnabled) {
            return;
        }

        if (!value) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "SUPABASE_SERVICE_ROLE_KEY is required when NEXT_PUBLIC_ENABLE_MESSAGING is true",
            });
            return;
        }

        const isLegacyJwt = value.split(".").length === 3;
        const isSecretKey = value.startsWith("sb_secret_");

        if (!isLegacyJwt && !isSecretKey) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "SUPABASE_SERVICE_ROLE_KEY must be a Supabase service role key",
            });
        }
    });

const runtimeEnv = {
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN ?? process.env.GITHUB_API_KEY,
    CONTACT_CRYPTO_KEY: process.env.CONTACT_CRYPTO_KEY,
    CONTACT_EMAIL_ENCRYPTED: process.env.CONTACT_EMAIL_ENCRYPTED,
};
export const serverEnv = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]),
        SUPABASE_SERVICE_ROLE_KEY: supabaseServiceRoleKey,
        WEATHER_API_KEY: z.string().optional(),
        GITHUB_TOKEN: optionalNonEmptyString,
        CONTACT_CRYPTO_KEY: optionalNonEmptyString,
        CONTACT_EMAIL_ENCRYPTED: encryptedContactValue,
    },
    runtimeEnv,
});
