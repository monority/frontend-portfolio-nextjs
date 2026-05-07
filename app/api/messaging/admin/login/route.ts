import { NextResponse } from "next/server";

import { messagingAdminLoginSchema } from "@/features/messaging";
import { createSupabaseServerClient } from "@lib/supabase/auth";

export async function POST(request: Request) {
    const payload = await request.json().catch(() => null);
    const parsedPayload = messagingAdminLoginSchema.safeParse(payload);

    if (!parsedPayload.success) {
        return NextResponse.json(
            {
                error: parsedPayload.error.flatten(),
            },
            { status: 400 },
        );
    }

    try {
        const supabase = await createSupabaseServerClient();
        const { data, error } = await supabase.auth.signInWithPassword(parsedPayload.data);

        if (error || !data.user) {
            return NextResponse.json(
                { error: error?.message ?? "Invalid credentials" },
                { status: 401 },
            );
        }

        return NextResponse.json({
            session: {
                userId: data.user.id,
                email: data.user.email ?? null,
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unable to sign in",
            },
            { status: 500 },
        );
    }
}