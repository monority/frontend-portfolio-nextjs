import "server-only";

import { createSupabaseAdminClient } from "@lib/supabase/auth";
import {
    createMessagingResumeToken,
    getMessagingPreview,
    hashMessagingResumeToken,
    normalizeMessagingBody,
    normalizeMessagingUsername,
} from "@lib/supabase/utils";
import type {
    MessagingConversationStatus,
    MessagingConversationSummary,
    MessagingMessage,
    MessagingThread,
} from "@shared-types";

type MessagingConversationRow = {
    id: string;
    visitor_username: string;
    status: MessagingConversationStatus;
    created_at: string;
    updated_at: string;
    last_message_at: string | null;
    last_message_preview: string | null;
};

type MessagingMessageRow = {
    id: string;
    conversation_id: string;
    sender_role: "visitor" | "admin";
    body: string;
    created_at: string;
};

function toMessagingError(error: unknown, fallback: string) {
    if (
        error &&
        typeof error === "object" &&
        "message" in error &&
        typeof error.message === "string" &&
        error.message.length > 0
    ) {
        return new Error(error.message);
    }

    return new Error(fallback);
}

const conversationSelect = `
    id,
    visitor_username,
    status,
    created_at,
    updated_at,
    last_message_at,
    last_message_preview
`;

const messageSelect = `
    id,
    conversation_id,
    sender_role,
    body,
    created_at
`;

function mapConversation(row: MessagingConversationRow): MessagingConversationSummary {
    return {
        id: row.id,
        visitorUsername: row.visitor_username,
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        lastMessageAt: row.last_message_at,
        lastMessagePreview: row.last_message_preview,
        unreadCount: 0,
    };
}

function mapMessage(row: MessagingMessageRow): MessagingMessage {
    return {
        id: row.id,
        conversationId: row.conversation_id,
        senderRole: row.sender_role,
        body: row.body,
        createdAt: row.created_at,
    };
}

async function getConversationByTokenHash(tokenHash: string) {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
        .from("messaging_conversations")
        .select(conversationSelect)
        .eq("visitor_token_hash", tokenHash)
        .maybeSingle<MessagingConversationRow>();

    if (error) {
        throw toMessagingError(error, "Unable to load conversation");
    }

    return data;
}

async function listConversationMessages(conversationId: string) {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
        .from("messaging_messages")
        .select(messageSelect)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true })
        .returns<MessagingMessageRow[]>();

    if (error) {
        throw toMessagingError(error, "Unable to load messages");
    }

    return (data ?? []).map(mapMessage);
}

async function updateConversationActivity(conversationId: string, body: string, createdAt: string) {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
        .from("messaging_conversations")
        .update({
            last_message_at: createdAt,
            last_message_preview: getMessagingPreview(body),
        })
        .eq("id", conversationId)
        .select(conversationSelect)
        .single<MessagingConversationRow>();

    if (error) {
        throw toMessagingError(error, "Unable to update conversation");
    }

    return data;
}

async function insertMessage(conversationId: string, senderRole: "visitor" | "admin", body: string) {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
        .from("messaging_messages")
        .insert({
            conversation_id: conversationId,
            sender_role: senderRole,
            body,
        })
        .select(messageSelect)
        .single<MessagingMessageRow>();

    if (error) {
        throw toMessagingError(error, "Unable to send message");
    }

    return data;
}

export async function startVisitorConversation({
    username,
    message,
}: {
    username: string;
    message: string;
}) {
    const supabase = createSupabaseAdminClient();
    const resumeToken = createMessagingResumeToken();
    const tokenHash = await hashMessagingResumeToken(resumeToken);
    const normalizedUsername = normalizeMessagingUsername(username);
    const normalizedMessage = normalizeMessagingBody(message);

    const { data: conversation, error: conversationError } = await supabase
        .from("messaging_conversations")
        .insert({
            visitor_username: normalizedUsername,
            visitor_token_hash: tokenHash,
        })
        .select(conversationSelect)
        .single<MessagingConversationRow>();

    if (conversationError) {
        throw toMessagingError(conversationError, "Unable to create conversation");
    }

    const insertedMessage = await insertMessage(conversation.id, "visitor", normalizedMessage);
    const activeConversation = await updateConversationActivity(
        conversation.id,
        insertedMessage.body,
        insertedMessage.created_at,
    );

    return {
        resumeToken,
        thread: {
            conversation: mapConversation(activeConversation),
            messages: [mapMessage(insertedMessage)],
        } satisfies MessagingThread,
    };
}

export async function getVisitorThreadByToken(token: string) {
    const tokenHash = await hashMessagingResumeToken(token);
    const conversation = await getConversationByTokenHash(tokenHash);

    if (!conversation) {
        return null;
    }

    const messages = await listConversationMessages(conversation.id);

    return {
        conversation: mapConversation(conversation),
        messages,
    } satisfies MessagingThread;
}

export async function addVisitorMessage(token: string, message: string) {
    const tokenHash = await hashMessagingResumeToken(token);
    const conversation = await getConversationByTokenHash(tokenHash);

    if (!conversation) {
        throw new Error("Conversation not found");
    }

    const insertedMessage = await insertMessage(
        conversation.id,
        "visitor",
        normalizeMessagingBody(message),
    );

    const activeConversation = await updateConversationActivity(
        conversation.id,
        insertedMessage.body,
        insertedMessage.created_at,
    );

    return {
        conversation: mapConversation(activeConversation),
        messages: await listConversationMessages(conversation.id),
    } satisfies MessagingThread;
}

export async function listAdminConversations() {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
        .from("messaging_conversations")
        .select(conversationSelect)
        .order("last_message_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .returns<MessagingConversationRow[]>();

    if (error) {
        throw toMessagingError(error, "Unable to load conversations");
    }

    return (data ?? []).map(mapConversation);
}

export async function getAdminThread(conversationId: string) {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
        .from("messaging_conversations")
        .select(conversationSelect)
        .eq("id", conversationId)
        .single<MessagingConversationRow>();

    if (error) {
        throw toMessagingError(error, "Unable to load conversation");
    }

    return {
        conversation: mapConversation(data),
        messages: await listConversationMessages(conversationId),
    } satisfies MessagingThread;
}

export async function addAdminMessage(conversationId: string, message: string) {
    const insertedMessage = await insertMessage(
        conversationId,
        "admin",
        normalizeMessagingBody(message),
    );

    await updateConversationActivity(
        conversationId,
        insertedMessage.body,
        insertedMessage.created_at,
    );

    return getAdminThread(conversationId);
}