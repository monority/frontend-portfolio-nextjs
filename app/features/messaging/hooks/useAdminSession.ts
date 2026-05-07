"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import type { MessagingAdminSession } from "@shared-types";
import { getApiErrorMessage, readJsonResponse } from "../http";

export function useAdminSession() {
    const t = useTranslations("messaging.admin");
    const [session, setSession] = useState<MessagingAdminSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("/api/messaging/admin/session", { cache: "no-store" });
                if (!res.ok) {
                    setSession(null);
                    return;
                }
                const payload = await readJsonResponse<{ session: MessagingAdminSession | null }>(
                    res,
                    t("errors.session"),
                );
                setSession(payload.session);
            } catch {
                setSession(null);
            } finally {
                setIsLoading(false);
            }
        };
        void load();
    }, [t]);

    const login = async (email: string, password: string): Promise<void> => {
        setError(null);
        const res = await fetch("/api/messaging/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const payload = await readJsonResponse<{ session?: MessagingAdminSession }>(
            res,
            t("errors.login"),
        );
        if (!res.ok) throw new Error(getApiErrorMessage(payload, t("errors.login")));
        setSession(payload.session ?? null);
    };

    const logout = async (): Promise<void> => {
        const res = await fetch("/api/messaging/admin/logout", { method: "POST" });
        const payload = await readJsonResponse<{ error?: string }>(res, t("errors.logout"));
        if (!res.ok) throw new Error(getApiErrorMessage(payload, t("errors.logout")));
        setSession(null);
    };

    return { session, setSession, isLoading, error, setError, login, logout };
}
