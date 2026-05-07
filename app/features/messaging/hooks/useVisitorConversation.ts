"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import type { MessagingThread } from "@shared-types";
import { getApiErrorMessage, readJsonResponse } from "../http";

export function useVisitorConversation(isOpen: boolean) {
    const t = useTranslations("messaging");
    const [thread, setThread] = useState<MessagingThread | null>(null);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const threadRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const scrollY = window.scrollY;
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        const load = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/messaging/visitor/thread", { cache: "no-store" });
                const payload = await readJsonResponse<{ thread: MessagingThread | null }>(
                    res,
                    t("visitor.errors.load"),
                );
                if (!res.ok) throw new Error(getApiErrorMessage(payload, t("visitor.errors.load")));
                setThread(payload.thread);
                setUsername(payload.thread?.conversation.visitorUsername ?? "");
            } catch (err) {
                setError(err instanceof Error ? err.message : t("visitor.errors.load"));
            } finally {
                setIsLoading(false);
            }
        };

        void load();
        return () => {
            const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollY);
        };
    }, [isOpen, t]);

    const messageCount = thread?.messages.length ?? 0;
    useEffect(() => {
        if (messageCount > 0 && threadRef.current) {
            threadRef.current.scrollTop = threadRef.current.scrollHeight;
        }
    }, [messageCount]);

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const res = await fetch(
                thread ? "/api/messaging/visitor/messages" : "/api/messaging/visitor/conversation",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(thread ? { message } : { username, message }),
                },
            );
            const payload = await readJsonResponse<{ thread: MessagingThread }>(
                res,
                t("visitor.errors.submit"),
            );
            if (!res.ok) throw new Error(getApiErrorMessage(payload, t("visitor.errors.submit")));
            setThread(payload.thread);
            setUsername(payload.thread.conversation.visitorUsername);
            setMessage("");
        } catch (err) {
            setError(err instanceof Error ? err.message : t("visitor.errors.submit"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        thread,
        username,
        setUsername,
        message,
        setMessage,
        error,
        isLoading,
        isSubmitting,
        submit,
        threadRef,
    };
}
