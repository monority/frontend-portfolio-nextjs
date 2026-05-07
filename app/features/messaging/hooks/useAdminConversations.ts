"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import type {
    MessagingAdminSession,
    MessagingConversationSummary,
    MessagingThread,
} from "@shared-types";
import { getApiErrorMessage, readJsonResponse } from "../http";

export function useAdminConversations(session: MessagingAdminSession | null) {
    const t = useTranslations("messaging.admin");
    const [conversations, setConversations] = useState<MessagingConversationSummary[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [thread, setThread] = useState<MessagingThread | null>(null);
    const [reply, setReply] = useState("");
    const [isLoadingConversations, setIsLoadingConversations] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchConversations = useCallback(async () => {
        setIsLoadingConversations(true);
        setError(null);
        try {
            const res = await fetch("/api/messaging/admin/conversations", { cache: "no-store" });
            const payload = await readJsonResponse<{
                conversations: MessagingConversationSummary[];
                error?: string;
            }>(res, t("errors.list"));
            if (!res.ok) throw new Error(getApiErrorMessage(payload, t("errors.list")));
            setConversations(payload.conversations);
            setActiveConversationId((curr) => curr ?? payload.conversations[0]?.id ?? null);
            if (!payload.conversations.length) setThread(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : t("errors.list"));
        } finally {
            setIsLoadingConversations(false);
        }
    }, [t]);

    useEffect(() => {
        if (!session) {
            setConversations([]);
            setThread(null);
            setActiveConversationId(null);
            return;
        }
        void fetchConversations();
    }, [session, fetchConversations]);

    useEffect(() => {
        if (!session || !activeConversationId) return;
        const load = async () => {
            try {
                const res = await fetch(
                    `/api/messaging/admin/conversations/${activeConversationId}`,
                    { cache: "no-store" },
                );
                const payload = await readJsonResponse<{ thread: MessagingThread }>(
                    res,
                    t("errors.thread"),
                );
                if (!res.ok) throw new Error(getApiErrorMessage(payload, t("errors.thread")));
                setThread(payload.thread);
            } catch (err) {
                setError(err instanceof Error ? err.message : t("errors.thread"));
            }
        };
        void load();
    }, [activeConversationId, session, t]);

    const sendReply = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!activeConversationId) return;
        setIsSubmitting(true);
        setError(null);
        try {
            const res = await fetch(
                `/api/messaging/admin/conversations/${activeConversationId}/messages`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: reply }),
                },
            );
            const payload = await readJsonResponse<{ thread: MessagingThread }>(
                res,
                t("errors.reply"),
            );
            if (!res.ok) throw new Error(getApiErrorMessage(payload, t("errors.reply")));
            setThread(payload.thread);
            setReply("");
            await fetchConversations();
        } catch (err) {
            setError(err instanceof Error ? err.message : t("errors.reply"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        conversations,
        activeConversationId,
        setActiveConversationId,
        thread,
        reply,
        setReply,
        isLoadingConversations,
        isSubmitting,
        error,
        setError,
        sendReply,
    };
}
