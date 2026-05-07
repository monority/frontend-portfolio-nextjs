import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { messagingPostMessageSchema } from "@/features/messaging";
import { addVisitorMessage } from "@/features/messaging/services/messaging.server";
import { MESSAGING_RESUME_COOKIE_NAME } from "@lib/supabase/utils";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get(MESSAGING_RESUME_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json({ error: "Missing conversation token" }, { status: 401 });
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
        const thread = await addVisitorMessage(token, parsedPayload.data.message);

        return NextResponse.json({ thread }, { status: 201 });
    } catch (error) {
        const status = error instanceof Error && error.message === "Conversation not found" ? 404 : 500;

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unable to send message",
            },
            { status },
        );
    }
}