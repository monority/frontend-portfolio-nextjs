import { NextResponse } from "next/server";

import { messagingConversationSchema } from "@/features/messaging";
import { startVisitorConversation } from "@/features/messaging/services/messaging.server";
import { MESSAGING_RESUME_COOKIE_NAME } from "@lib/supabase/utils";

function buildResumeCookie(value: string) {
    return {
        name: MESSAGING_RESUME_COOKIE_NAME,
        value,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "lax" as const,
        secure: true,
    };
}

export async function POST(request: Request) {
    const payload = await request.json().catch(() => null);
    const parsedPayload = messagingConversationSchema.safeParse(payload);

    if (!parsedPayload.success) {
        return NextResponse.json(
            {
                error: parsedPayload.error.flatten(),
            },
            { status: 400 },
        );
    }

    try {
        const { resumeToken, thread } = await startVisitorConversation(parsedPayload.data);
        const response = NextResponse.json({ thread }, { status: 201 });

        response.cookies.set(buildResumeCookie(resumeToken));

        return response;
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unable to create conversation",
            },
            { status: 500 },
        );
    }
}