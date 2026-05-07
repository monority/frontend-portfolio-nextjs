"use client";

import { useTranslations } from "next-intl";

import type { MessagingConversationSummary } from "@shared-types";
import ConversationItem from "./ConversationItem";

interface ConversationListProps {
    conversations: MessagingConversationSummary[];
    activeConversationId: string | null;
    isLoading: boolean;
    onSelect: (id: string) => void;
}

export default function ConversationList({
    conversations,
    activeConversationId,
    isLoading,
    onSelect,
}: ConversationListProps) {
    const t = useTranslations("messaging.admin");

    if (isLoading) {
        return <p className="messaging-admin__muted">{t("loadingConversations")}</p>;
    }

    if (!conversations.length) {
        return <p className="messaging-admin__empty">{t("emptyConversations")}</p>;
    }

    return (
        <ul className="messaging-admin__conversation-list">
            {conversations.map((conversation) => (
                <li key={conversation.id}>
                    <ConversationItem
                        conversation={conversation}
                        isActive={conversation.id === activeConversationId}
                        onSelect={onSelect}
                    />
                </li>
            ))}
        </ul>
    );
}
