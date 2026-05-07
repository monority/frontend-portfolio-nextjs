import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const messagingEnabled = process.env.NEXT_PUBLIC_ENABLE_MESSAGING === "true";

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
};
export const serverEnv = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "test", "production"]),
        SUPABASE_SERVICE_ROLE_KEY: supabaseServiceRoleKey,
    },
    runtimeEnv,
});