import { NextResponse } from "next/server";

import { getAdminSession } from "@lib/supabase/auth";

export async function GET() {
    try {
        const session = await getAdminSession();

        if (!session) {
            return NextResponse.json({ session: null }, { status: 401 });
        }

        return NextResponse.json({ session });
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unable to load session",
            },
            { status: 500 },
        );
    }
}