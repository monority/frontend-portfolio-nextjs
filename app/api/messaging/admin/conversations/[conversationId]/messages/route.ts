import { NextResponse } from "next/server";

import {
    messagingConversationIdSchema,
    messagingPostMessageSchema,
} from "@/features/messaging";
import { addAdminMessage } from "@/features/messaging/services/messaging.server";
import { requireAdminSession } from "@lib/supabase/auth";

export async function POST(
    request: Request,
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

    const payload = await request.json().catch(() => null);
    const parsedPayload = messagingPostMessageSchema.safeParse(payload);

    if (!parsedPayload.success) {
        return NextResponse.json(
            {
                error: parsedPayload.error.flatten(),
            },
            { status: 400 },
        );
    }

    try {
        await requireAdminSession();
        const thread = await addAdminMessage(
            parsedParams.data.conversationId,
            parsedPayload.data.message,
        );

        return NextResponse.json({ thread }, { status: 201 });
    } catch (error) {
        const status = error instanceof Error && error.message === "Unauthorized" ? 401 : 500;

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unable to send reply",
            },
            { status },
        );
    }
}