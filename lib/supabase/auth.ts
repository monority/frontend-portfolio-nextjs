import "server-only";

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { env } from "../../env";
import { serverEnv } from "../../env.server";
import type { MessagingAdminSession } from "../../types";

function getSupabaseServiceRoleKey() {
	if (!serverEnv.SUPABASE_SERVICE_ROLE_KEY) {
		throw new Error("SUPABASE_SERVICE_ROLE_KEY is required to use admin messaging APIs.");
	}

	return serverEnv.SUPABASE_SERVICE_ROLE_KEY;
}

export async function createSupabaseServerClient() {
	const cookieStore = await cookies();

	return createServerClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) => {
							cookieStore.set(name, value, options);
						});
					} catch {
						// Server components can read cookies but not always mutate them.
					}
				},
			},
		},
	);
}

export function createSupabaseAdminClient() {
	return createClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		getSupabaseServiceRoleKey(),
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		},
	);
}

export async function getAdminSession(): Promise<MessagingAdminSession | null> {
	const supabase = await createSupabaseServerClient();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data.user) {
		return null;
	}

	return {
		userId: data.user.id,
		email: data.user.email ?? null,
	};
}

export async function requireAdminSession() {
	const session = await getAdminSession();

	if (!session) {
		throw new Error("Unauthorized");
	}

	return session;
}
