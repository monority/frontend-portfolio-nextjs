import { NextResponse } from "next/server";

import { messagingConversationIdSchema } from "@/features/messaging";
import { getAdminThread } from "@/features/messaging/services/messaging.server";
import { requireAdminSession } from "@lib/supabase/auth";

export async function GET(
    _request: Request,
    context: { params: Promise<{ conversationId: string }> },
) {
    const params = await context.params;
    const parsedParams = messagingConversationIdSchema.safeParse(params);

    if (!parsedParams.success) {
        return NextResponse.json(
            {
                error: parsedParams.error.flatten(),
            },
            { status: 400 },
        );
    }

    try {
        await requireAdminSession();
        const thread = await getAdminThread(parsedParams.data.conversationId);

        return NextResponse.json({ thread });
    } catch (error) {
        const status = error instanceof Error && error.message === "Unauthorized" ? 401 : 500;

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unable to load thread",
            },
            { status },
        );
    }
}