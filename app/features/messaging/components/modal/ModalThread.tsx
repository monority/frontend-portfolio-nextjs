"use client";

import type { RefObject } from "react";
import { useTranslations } from "next-intl";

import type { MessagingThread } from "@shared-types";
import MessageBubble from "../shared/MessageBubble";

interface ModalThreadProps {
    thread: MessagingThread;
    threadRef: RefObject<HTMLDivElement | null>;
}

export default function ModalThread({ thread, threadRef }: ModalThreadProps) {
    const t = useTranslations("messaging");
    const { messages, conversation } = thread;

    return (
        <div className="msg-thread" ref={threadRef} aria-live="polite">
            {messages.map((entry) => (
                <MessageBubble
                    key={entry.id}
                    senderRole={entry.senderRole}
                    body={entry.body}
                    createdAt={entry.createdAt}
                    authorLabel={
                        entry.senderRole === "admin"
                            ? t("visitor.roles.admin")
                            : conversation.visitorUsername
                    }
                />
            ))}
        </div>
    );
}
