import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@lib/supabase/auth";

export async function POST() {
    try {
        const supabase = await createSupabaseServerClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unable to sign out",
            },
            { status: 500 },
        );
    }
}