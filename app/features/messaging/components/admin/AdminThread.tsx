"use client";

import { useLocale, useTranslations } from "next-intl";

import type { MessagingThread } from "@shared-types";
import MessageBubble from "../shared/MessageBubble";

interface AdminThreadProps {
    thread: MessagingThread | null;
}

export default function AdminThread({ thread }: AdminThreadProps) {
    const t = useTranslations("messaging.admin");
    const locale = useLocale();

    return (
        <div className="messaging-thread messaging-admin__thread">
            {thread?.messages.length ? (
                thread.messages.map((entry) => (
                    <MessageBubble
                        key={entry.id}
                        senderRole={entry.senderRole}
                        body={entry.body}
                        createdAt={entry.createdAt}
                        authorLabel={
                            entry.senderRole === "admin"
                                ? t("roles.admin")
                                : thread.conversation.visitorUsername
                        }
                        locale={locale}
                    />
                ))
            ) : (
                <p className="messaging-thread__empty">{t("threadEmpty")}</p>
            )}
        </div>
    );
}
