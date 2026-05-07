import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { getVisitorThreadByToken } from "@/features/messaging/services/messaging.server";
import { MESSAGING_RESUME_COOKIE_NAME } from "@lib/supabase/utils";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get(MESSAGING_RESUME_COOKIE_NAME)?.value;

    if (!token) {
        return NextResponse.json({ thread: null });
    }

    try {
        const thread = await getVisitorThreadByToken(token);
        const response = NextResponse.json({ thread });

        if (!thread) {
            response.cookies.delete(MESSAGING_RESUME_COOKIE_NAME);
        }

        return response;
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unable to load conversation",
            },
            { status: 500 },
        );
    }
}