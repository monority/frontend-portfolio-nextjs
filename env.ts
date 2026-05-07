import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const envBoolean = z
    .enum(["true", "false"])
    .optional()
    .default("false")
    .transform((value) => value === "true");

export const env = createEnv({
    client: {
        NEXT_PUBLIC_APP_URL: z.string().url(),
        NEXT_PUBLIC_API_URL: z.string().url(),
        NEXT_PUBLIC_ENABLE_MESSAGING: envBoolean,
        NEXT_PUBLIC_ENABLE_NEW_UI: envBoolean,
        NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_ENABLE_MESSAGING: process.env.NEXT_PUBLIC_ENABLE_MESSAGING,
        NEXT_PUBLIC_ENABLE_NEW_UI: process.env.NEXT_PUBLIC_ENABLE_NEW_UI,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    },
});