"use client";

import { useLocale, useTranslations } from "next-intl";

import type { MessagingConversationSummary } from "@shared-types";

interface ConversationItemProps {
    conversation: MessagingConversationSummary;
    isActive: boolean;
    onSelect: (id: string) => void;
}

function formatTimestamp(locale: string, value: string | null): string | null {
    if (!value) return null;
    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));
}

export default function ConversationItem({ conversation, isActive, onSelect }: ConversationItemProps) {
    const t = useTranslations("messaging.admin");
    const locale = useLocale();
    const timestamp = formatTimestamp(locale, conversation.lastMessageAt ?? conversation.updatedAt);

    return (
        <button
            type="button"
            className={`messaging-admin__conversation${isActive ? " messaging-admin__conversation--active" : ""}`}
            aria-pressed={isActive}
            onClick={() => onSelect(conversation.id)}
        >
            <span className="messaging-admin__conversation-row">
                <span className="messaging-admin__conversation-name">
                    {conversation.visitorUsername}
                </span>
                {timestamp && (
                    <span className="messaging-admin__conversation-time">{timestamp}</span>
                )}
            </span>
            <span className="messaging-admin__conversation-row messaging-admin__conversation-row--bottom">
                <span className="messaging-admin__conversation-preview">
                    {conversation.lastMessagePreview ?? t("emptyPreview")}
                </span>
                <span
                    className={`messaging-admin__conversation-badge messaging-admin__conversation-badge--${conversation.status}`}
                >
                    {conversation.unreadCount > 0 ? conversation.unreadCount : conversation.status}
                </span>
            </span>
        </button>
    );
}
