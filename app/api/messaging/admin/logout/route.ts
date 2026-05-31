import { NextResponse } from "next/server";

import { createSupabaseServerClient, requireAdminSession } from "../../../../../lib/supabase/auth";

export async function POST() {
    try {
        await requireAdminSession();
        const supabase = await createSupabaseServerClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        const status = error instanceof Error && error.message === "Unauthorized" ? 401 : 500;

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unable to sign out",
            },
            { status },
        );
    }
}