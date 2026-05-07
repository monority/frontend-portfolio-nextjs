import { NextResponse } from "next/server";

import { listAdminConversations } from "@/features/messaging/services/messaging.server";
import { requireAdminSession } from "@lib/supabase/auth";

export async function GET() {
    try {
        await requireAdminSession();
        const conversations = await listAdminConversations();

        return NextResponse.json({ conversations });
    } catch (error) {
        const status = error instanceof Error && error.message === "Unauthorized" ? 401 : 500;

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unable to load conversations",
            },
            { status },
        );
    }
}