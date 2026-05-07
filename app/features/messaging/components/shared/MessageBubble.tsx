import type { MessagingSenderRole } from "@shared-types";

import "./shared.css";

interface MessageBubbleProps {
    senderRole: MessagingSenderRole;
    body: string;
    createdAt: string;
    authorLabel: string;
    locale?: string;
}

function formatTime(locale: string | undefined, value: string) {
    return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "short",
    }).format(new Date(value));
}

export default function MessageBubble({
    senderRole,
    body,
    createdAt,
    authorLabel,
    locale,
}: MessageBubbleProps) {
    return (
        <article className={`msg-bubble msg-bubble--${senderRole}`}>
            <span className="msg-bubble__meta">
                <span className="msg-bubble__author">{authorLabel}</span>
                <span className="msg-bubble__sep" aria-hidden="true">·</span>
                <time className="msg-bubble__time" dateTime={createdAt}>
                    {formatTime(locale, createdAt)}
                </time>
            </span>
            <p className="msg-bubble__body">{body}</p>
        </article>
    );
}
